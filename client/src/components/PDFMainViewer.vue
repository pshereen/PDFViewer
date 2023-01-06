// src/App.vue

<template>
	<div id="pdfmain">
		<label for="file-upload" class="custom-file-upload">
			Open PDF
		</label>
		<input
			id="file-upload"
			type="file"
			@change="openDocument"
			class="btn"
		/>
		<PSPDFKitContainer :pdfFile="pdfFile" @loaded="handleLoaded" />
	</div>
</template>

<script>
import PSPDFKitContainer from '@/components/PSPDFKitContainer';

export default {
	data() {
		return {
			pdfFile:"",
		};
	},
	
	components: {
		PSPDFKitContainer,
	},
	
	methods: {
		handleLoaded(instance) {
			console.log('PSPDFKit has loaded: ', instance);
		},

		openDocument() {
			if (this.pdfFile) {
				window.URL.revokeObjectURL(this.pdfFile);
			}
			this.pdfFile = window.URL.createObjectURL(
				event.target.files[0],
			);
		},
	},

	// mounted(){
	// 	this.emitter.on("From-FileSystem", fileName => {
	// 		this.pdfFile = fileName;
	// 		console.log("File name received from FileSystem: " + fileName );
    // }); 
	// }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}

body {
	margin: 0;
}

input[type='file'] {
	display: none;
}

.custom-file-upload {
	border: 1px solid #ccc;
	border-radius: 4px;
	display: inline-block;
	padding: 6px 12px;
	cursor: pointer;
	background: #4a8fed;
	padding: 10px;
	color: #fff;
	font: inherit;
	font-size: 16px;
	font-weight: bold;
}
</style>