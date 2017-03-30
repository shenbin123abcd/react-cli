/**
 * Created by chenbin on 2017/2/19.
 */
var webpack=require('webpack');
var path=require('path');
var HtmlWebpackPlugin=require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports={
    entry:{
        app:'./src/app.js',
        vendor:['react','react-dom']
    },
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'js/[name].[chunkhash].js'
    },
    resolve:{
        extensions:['.js','.jsx','.json'],
        alias:{
            'src':path.resolve(__dirname,'./src'),
            'components':path.resolve(__dirname,'./src/components'),
            'img':path.resolve(__dirname,'./src/img'),
            'css':path.resolve(__dirname,'./src/css'),
            'js':path.resolve(__dirname,'./src/js'),
        }
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                exclude:path.resolve(__dirname,'node_modules'),
                include:path.resolve(__dirname,'src'),
                use:[
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015','react','stage-0'],
                            plugins: ['transform-decorators-legacy','transform-runtime'],
                        },

                    },
                ]
            },
            {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test:/\.scss$/,
                exclude:path.resolve(__dirname,'node_modules'),
                include:path.resolve(__dirname,'src'),
                use:[
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 2 }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:function(){
                                return[
                                    require('precss'),
                                    require('autoprefixer')({
                                        browsers:['last 5 versions']
                                    })
                                ]
                            }
                        }
                    },
                    'sass-loader',
                ]
            },
            {
                test:/\.less$/,
                exclude:path.resolve(__dirname,'node_modules'),
                include:path.resolve(__dirname,'src'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 2 }
                        },
                        {
                            loader:'postcss-loader',
                            options:{
                                plugins:function(){
                                    return[
                                        require('precss'),
                                        require('autoprefixer')({
                                            browsers:['last 5 versions']
                                        })
                                    ]
                                }
                            }
                        },
                        'less-loader',
                    ]
                })
            },
            {
                test:/\.(jpg|jpeg|png|gif|svg)$/i,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:10000,
                            name:'img/[name]-[hash:5].[ext]'
                        }
                    },
                ],
                exclude:path.resolve(__dirname,'node_modules'),
                include:path.resolve(__dirname,'src'),
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit: 10000,
                            name: 'css/fonts/[name].[hash:5].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            inject:'body',
            minify:{
                removeComments:true,
                collapseWhitespace:true,
            }
        }),
        new ExtractTextPlugin("css/[name].[chunkhash].css"),
        new webpack.optimize.UglifyJsPlugin({
            compressor:{
                warnings:false
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendor',
        })
    ],
}
