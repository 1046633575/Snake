const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports={
    entry:'./src/ts/app.ts',
    output:{
        path:path.resolve(__dirname,"dist/js"),
        filename:'bundle.js'
    },
    module: {
        rules: [  // 添加解析规则
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    resolve: {   // 需要打包的文件后缀
        extensions: [".tsx", ".ts", ".js"]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    devServer:{
        open:true,
        port:8000
    }
}　　
