<style>
.scroll{
  width: 150px;
  max-height: 150px;
  overflow: scroll;
  background: lightgrey;
  margin-bottom: 20px;
}
.selectfolder{
  width: 200px;
  height: 120px;
  overflow: scroll;
  background: lightgrey;
  margin-bottom: 20px;
}
#pageContainer {
  margin: auto;
  width: 80%;
}

div.page {
  display: inline-block;
}
</style>
<template>
  <div>
    <h1>Open Folder</h1>

    <a href = "http://localhost:8080"> Home </a>
    <br /> <br />

    <div> <button @click="viewfile"> <router-link to="viewpdf">PDF Viewer</router-link>
      </button> 
    </div>

    <br /> <br />

    <div v-if="openfoldervisible">

        <input
          type="text"
          name="foldername"
          placeholder="foldername"
          v-model="foldername"
        />
        <br /> <br />
        <div>
          <button @click="openfolder">Go to Server Folder</button>
        </div>

    </div>

    <br /> <br />

    <div v-if="showlistvisible">

        <button @click="openfolder2">Open {{ selected[0] }}</button>
        <br /> <br />
        <select v-model="selected" multiple class = "selectfolder">
           <option v-for="file in files" :key="file">{{file}}</option>
        </select>

    </div>
    
    <div> 
      <button @click="sendfilename"> Download PDF File </button> 
    </div>

      <br /> <br />

    <div v-if ="showdownloadlink">
      <a :href ="this.downloadlink"> Click to Start Downloading</a>
    </div>

  </div>
</template>

<script>
import FileService from "@/services/FileService.js";
import SERVER_BASE_URL from "@/config/ServerConfig.js"

export default {
  data() {
    return {
      foldername: "",
      downloadlink: "",
      files: [],
      selected: [],
      openfoldervisible: true,
      showlistvisible: false,
      showdownloadlink: false,
    };
  },

  methods: {
    async openfolder() {
      const response = await FileService.openfolder({
        foldername: this.foldername,
      });
      console.log(response.data);
      this.showlistvisible= true;
      this.openfoldervisible= false;
      this.files = response.data.folders;
      console.log(this.files);
    },

    async openfolder2() {
      if(!this.selected[0].endsWith('.pdf')){
        this.foldername +='/'+this.selected[0];
        const response = await FileService.openfolder({
          foldername: this.foldername,
        });
        console.log(response.data);
        this.showlistvisible= true;
        this.openfoldervisible= false;
        this.files = response.data.folders;
    }
    },      
    sendfilename(){
      if(this.selected[0]!=undefined && this.selected[0].endsWith('.pdf')){
        this.showdownloadlink = true;
        this.downloadlink = SERVER_BASE_URL+"/downloadfile?link="+this.foldername+"/"+this.selected[0];
      }
      else{
        alert('Please select a PDF file to download');
      }
      console.log(this.selected[0]);
      this.emitter.emit("From-FileSystem", this.selected[0]);
    },
    viewfile(){
      this.emitter.emit("From-FileSystem", this.selected[0]);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
