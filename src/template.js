export const header = () => {
  return `
  <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	
	<meta http-equiv="Content-Type" content="text/html">
	<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-touch-fullscreen" content="no">
	<title>中证指数舆情日报</title>
	<style>

		body {
			margin: 0;
			padding: 0;
			font-family: Arial, sans-serif;
			font-size: 14px;
			word-wrap: break-word;
		}
		.container {
			width: 90%;
			margin: 0 auto;
		}
		.logo {
			margin-top: 10px;
			margin-bottom: 10px;
		}
		.logo img {
			height: 60px;
			display: block;
		}
		.title {
			font-size: 24px;
			font-weight: bold;
			text-align: center;
					color: #C00000;
					margin-bottom: 20px;
		}
		.date {
			text-align: center;
			margin-bottom: 20px;
		}
		.line {
			height: 2px;
			background-color: #C00000;
			margin-bottom: 20px;
		}
		.sub-title {
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 10px;
				}
		.content {
			margin-bottom: 20px;
		}
	</style>

</head>
  `
}

export const info = () => {
  return `
		<div class="logo">
			<img src="./0601中证指数舆情日报_files/logo中证指数.png" alt="公司logo">
		</div>
		<div class="title">中证指数舆情日报</div>
		<div class="date"><strong>2023年06月01日   行政办公室</strong></div>
		<div class="line"></div>
  `
}
