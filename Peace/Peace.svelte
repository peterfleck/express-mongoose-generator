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
    let Peaces = [];
  
    onMount(async () => {
      loading = true;
      listPeaces();
      loading = false;
    });

async function listPeaces(){
    try {
        const response = await axios.get("/api/Peaces");
        Peaces = response.data;
      } catch (error) {
        console.error(error);
      }
}

async function showPeace(id){
    try {
        const response = await axios.get(`/api/Peaces/${id}`);;
        Peaces = response.data;
      } catch (error) {
        console.error(error);
      }
}

async function createPeace(Peace) {
    try{
      const response = await axios.post("/api/Peaces", Peace);
      Peaces = [response.data, ...Peaces];
      if (response.status === 200) {
      new Noty({
        type: "success",
        text: "Peace created",
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


    async function updatePeace(Peace) {
        try{
      const response = await axios.put(
        `/api/Peaces/${Peace._id}`,
        Peace
      );
      Peaces = [...Peaces];
      if (response.status === 200) {
        new Noty({
          type: "success",
          text: "Peace updated",
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
  
    async function removePeace(id) {
        try {
      const response = await axios.delete(`/api/Peaces/${id}`);
      Peaces = Peaces.filter((t) => t._id !== id);
      if (response.status === 200) {
        new Noty({
          type: "success",
          text: "Peace removed",
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
