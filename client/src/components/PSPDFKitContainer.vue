// src/components/PSPDFKitContainer.vue

<template>
	<div class="pdf-container"></div>
</template>

<script>
import PSPDFKit from 'pspdfkit';

export default {
	name: 'PSPDFKit',

	props: {
		pdfFile: {
			type: String,
			required: true,
		},
	},
	
	mounted() {
		this.loadPSPDFKit().then((instance) => {
			this.$emit('loaded', instance);
		});
	},
	
	watch: {
		pdfFile(val) {
			if (val) {
				this.loadPSPDFKit();
			}
		},
	},
	
	methods: {
		async loadPSPDFKit() {
			PSPDFKit.unload('.pdf-container');
			return PSPDFKit.load({
				document: this.pdfFile,
				container: '.pdf-container',
			});
		},
	},

	beforeUnmount() {
		PSPDFKit.unload('.pdf-container');
	},
};
</script>

<style scoped>
.pdf-container {
	height: 100vh;
}
</style>