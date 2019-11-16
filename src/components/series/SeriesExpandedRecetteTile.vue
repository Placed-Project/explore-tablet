<template>
  <div>
    <div class="atable-expanded-bg"></div>
    <div class="atable-expanded-recette">
      <div class="atable-expanded-close-button" @click="closeExpand"><img src="../../assets/close.svg"></div>
      <div class="atable-scroll-wrapper">
        <img class="series-tile-img" v-if="comobj.img" :src="comobj.img" :class="{zoomed:zoomed}"/>
        <div v-if="comobj.vid">
          <video :src="comobj.vid" :id="'a'+comobj.id+comobj.time" preload="metadata"></video>
          <div class="controls" v-if="!playing" @click="playPause"><img src="../../assets/triangle.svg"></div>
        </div>
        <div class="atable-expanded-text">
          <a class="atable-expanded-dl-button" @click="downloadPDF">Télécharger la recette</a>
          <div class="atable-expanded-title" v-html="recetteObj.title"></div>
          <em class="atable-expanded-author" v-html="recetteObj.author"></em>
          <div class="atable-expanded-recette-text" v-html="recetteObj.content.innerHTML"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf'

export default {
  props: [
    'comobj'
  ],
  data: function () {
    return {
      zoomed: false,
      playing: false
    }
  },
  methods: {
    closeExpand: function () {
      this.$emit('close-expand')
    },
    playPause: function () {
      let media = document.querySelector(`#a${this.comobj.id+this.comobj.time}`)
      if (media.paused) {
        media.play()
        this.playing = true
        media.controls = true
      }
      media.addEventListener('pause', () => {
        this.playing = false
        media.controls = false
      })
    },
    downloadPDF: function () {
      let recetteText = document.querySelector('.atable-expanded-recette-text').innerText
      var doc = new jsPDF();
      let strArr = recetteText.split('\n')
      let top = 50
      let maxNbLines = 40
      let nbLines = 0

      doc.setFontSize(24);

      doc.setFont("helvetica");
      doc.setFontStyle("bold");
      doc.text(this.recetteObj.title, 20, 30);
      doc.setFontSize(12)
      doc.setFontStyle("italic");
      doc.text(this.recetteObj.author, 20, 40);

      doc.setFontStyle("normal");
      for(const str of strArr) {
          let splitted = doc.splitTextToSize(str, 170)
          for (let splitty of splitted){
              doc.text(splitty, 20, top+=5)
              nbLines++
              if (nbLines >= maxNbLines) {
                  doc.addPage()
                  nbLines = 0
                  top = 20
              }
          } 
      }
      doc.save(`recette-tous-a-table.pdf`)
    }
  },
  computed: {
    totalVotes: function () {
      if (this.comobj.poll) {
        let total = 0
        for (const ans of this.comobj.poll) {
          total += ans.votes
        }
        return total
      }
    },
    recetteObj: function (){
      let recetteObj = {
        title: '',
        author: '',
        content: null
      }
      if (this.comobj.text) {
        let element = document.createElement('div')
        element.innerHTML = this.comobj.text
        recetteObj.title = element.childNodes[0].innerText
        recetteObj.author = element.childNodes[1].innerText
        element.childNodes[0].remove()
        element.childNodes[0].remove()
        recetteObj.content = element
      }

      return recetteObj
    }
  }
}
</script>

<style scoped>
.atable-expanded-dl-button {
  background-color: #ffcc33;
  color: #3e0449;
  padding: 15px;
  border-radius: 30px;
  box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.5);
  cursor: pointer;
  position: absolute;
  top: -25px;
}

.atable-expanded-bg {
  position: fixed;
  top:0;
  left:0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(4px);
  z-index: 20;
}

.atable-expanded-recette {
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translate(-50%,0);
  z-index: 25;
  background: white;
  border-radius: 5px;
  padding: 20px;
  max-height: 80%;
  height: 80%;
  border: solid 1px;
}

.atable-expanded-close-button {
  position: fixed;
  top: 0;
  right: 0;
}

.series-tile-img {
  max-width: 100%;
  min-width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

video {
  max-width: 100%;
  min-width: 100%;
  object-fit: cover;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  background-color: #4AA4FF;
}


img.zoomed {
  z-index: 25;
  width: auto;
  max-width: 80vw;
  max-height: 80vh;
  min-width: 0;
  min-height: 80vh;
  position: fixed;
  top: 10vh;
  left: 10vw;
  box-shadow: 0px 0px 41px 35px #545454;
}

.img-com-tile {
  padding: 0;
  width: 220px;
}

.img-com-tile .series-tile-text {
  padding: 20px;
}

.controls {
  position: absolute;
  transform: translate(20px, -120%);
}

.controls img {
  width: 50px;
}

.atable-expanded-title {
  font-weight: bold;
  color: #3e0449;
  margin-top: 30px;
}

.atable-expanded-recette-text {
  margin-top: 20px;
  height: 85%;
}

.atable-scroll-wrapper {
  overflow-y: auto;
  height: 100%;
  scrollbar-width: none; /* Firefox 64 */
  -ms-overflow-style: none; /* Internet Explorer 11 */
}

 .atable-scroll-wrapper::-webkit-scrollbar { /** WebKit */
    display: none;
  }

.atable-expanded-text {
  height: 100%;
}

.atable-recette-button {
  background-color: white;
  border-radius: 30px;
  color: #3e0449;
  text-align: right;
  width: max-content;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 20px;
}


.atable-expanded-close-button {
  background-color: #3e0449;
  position: fixed;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50px;
  z-index: 26;
  border: solid 2px white;
}

.atable-expanded-close-button img {
  width: 25px;
  transform: translate(50%, 50%);
}
</style>
