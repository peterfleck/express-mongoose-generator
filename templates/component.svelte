<script>
    import axios from "axios";
    import Noty from "noty";
    import "noty/lib/noty.css";
    import "noty/lib/themes/semanticui.css";
    import { onMount } from "svelte";
  
    Noty.overrideDefaults({
    layout: "topRight",
    theme: "semanticui",
    closeWith: ["click", "button"],
    timeout: 3000,
  });

    let loading = false;
    let {modelNamePlural} = [];
  
    onMount(async () => {
      loading = true;
      list{modelNamePluralCap}();
      loading = false;
    });

async function list{modelNamePluralCap}(){
    try {
        const response = await axios.get("/api/{modelNamePlural}");
        {modelNamePlural} = response.data;
      } catch (error) {
        console.error(error);
      }
}

async function show{modelNameCap}(id){
    try {
        const response = await axios.get(`/api/{modelNamePlural}/${id}`);;
        {modelNamePlural} = response.data;
      } catch (error) {
        console.error(error);
      }
}

async function create{modelNameCap}({modelName}) {
    try{
      const response = await axios.post("/api/{modelNamePlural}", {modelName});
      {modelNamePlural} = [response.data, ...{modelNamePlural}];
      if (response.status === 200) {
      new Noty({
        type: "success",
        text: "{modelName} created",
      }).show();
    }
 } catch (error) {
        console.error(error);
        new Noty({
        type: "error",
        text:
          "Error " + error.response.status + ": " + error.response.data.message,
      }).show();
      }
     } 


    async function update{modelNameCap}({modelName}) {
        try{
      const response = await axios.put(
        `/api/{modelNamePlural}/${{modelName}._id}`,
        {modelName}
      );
      {modelNamePlural} = [...{modelNamePlural}];
      if (response.status === 200) {
        new Noty({
          type: "success",
          text: "{modelName} updated",
        }).show();
      }
    }  catch (error) {
        console.error(error);
        new Noty({
        type: "error",
        text:
          "Error " + error.response.status + ": " + error.response.data.message,
      }).show();
      }
    }
  
    async function remove{modelNameCap}(id) {
        try {
      const response = await axios.delete(`/api/{modelNamePlural}/${id}`);
      {modelNamePlural} = {modelNamePlural}.filter((t) => t._id !== id);
      if (response.status === 200) {
        new Noty({
          type: "success",
          text: "{modelName} removed",
        }).show();
      }
    } catch (error) {
        console.error(error);
        new Noty({
        type: "error",
        text:
          "Error " + error.response.status + ": " + error.response.data.message,
      }).show();
      }
    }
</script>

<section class="section container">
    {#if loading}
        <p>Loading ...</p>
    {/if}
</section>

<style>
</style>
