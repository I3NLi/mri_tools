<template>
<mu-card style="width: 100%;  margin: 0 auto; ">
  <mu-card-header :title="$store.state.patient.name" :sub-title="$store.state.patient.sex+' - '+$store.state.patient.age" @click="$router.push('/')">
    <mu-avatar slot="avatar">
      <img src="../assets/mustermann.jpg">
    </mu-avatar>
  </mu-card-header>
  <mu-card-media :sub-title="scannResult">
    <i class="material-icons" style="
    margin-top: px;
    color: beige;
    bottom: 16px;
    right: 16px;
    position: absolute;
    font-size: 1.6em;
    z-index: 999999999;"
    @click="nextViedeoInputDevices()">
      sync
    </i>
    <video id="video" width="100%" height="100%" preload/>
  </mu-card-media>
  <mu-card-title title="Drug List" sub-title="by Dr. Who"></mu-card-title>
  <mu-card-text>
    <mu-alert color="error" delete v-if="hasError" @delete="closeAlert()" transition="mu-scale-transition">
      <mu-icon left value="warning" /> Wrong medicine!
    </mu-alert>
    <mu-list textline="two-line">
      <div v-for="drug in drugs">
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-content>
            <mu-list-item-title>{{drug.name}}</mu-list-item-title>
            <mu-list-item-sub-title style="color: rgba(0, 0, 0, .87)">{{drug.Brand}}</mu-list-item-sub-title>
            <mu-list-item-sub-title>
              {{drug.id}}
            </mu-list-item-sub-title>
          </mu-list-item-content>
          <mu-list-item-action>
            <mu-list-item-after-text>{{drug.dose}}</mu-list-item-after-text>
            <mu-checkbox color="green500" v-model="drug.checked" value="" uncheck-icon="error_outline" checked-icon="done"></mu-checkbox>
          </mu-list-item-action>

        </mu-list-item>
        <mu-divider></mu-divider>
      </div>
    </mu-list>
  </mu-card-text>
  <mu-card-actions>
    <mu-button flat @click="nextViedeoInputDevices()">Reset</mu-button>
    <mu-button flat>Confirm</mu-button>
  </mu-card-actions>
</mu-card>
</template>

<script>
import {
  BrowserMultiFormatReader,
  NotFoundException
} from '@zxing/library';

const codeReader = new BrowserMultiFormatReader();

// import Ssuccess from "../assets/success.mp3";
// import Sfailure from "../assets/failure.mp3";

// function playSound(music){
//      var borswer = window.navigator.userAgent.toLowerCase();
//      if ( borswer.indexOf( "ie" ) >= 0 ){
//        //IE内核浏览器
//        var strEmbed = '<embed name="embedPlay" src='+music+' autostart="true" hidden="true" loop="false"></embed>';
//        if ( $( "body" ).find( "embed" ).length <= 0 )
//          $( "body" ).append( strEmbed );
//        var embed = document.embedPlay;
//
//        //浏览器不支持 audion，则使用 embed 播放
//        embed.volume = 100;
//        //embed.play();这个不需要
//      } else{
//        //非IE内核浏览器
//        var strAudio = "<audio id='audioPlay' src="+music+" hidden='true'>";
//        if ( $( "body" ).find( "audio" ).length <= 0 )
//          $( "body" ).append( strAudio );
//        var audio = document.getElementById( "audioPlay" );
//
//        //浏览器支持 audion
//        audio.play();
//      }
//    }
//
//    playSound(Sfailure);
export default {
  name: 'DrugsChecker',
  data() {
    return {
      videoInputDevices: null,
      videoInputDevice: 0,
      drugs: [{
          id: "12345678909876543",
          name: "Dolo-Dobendan® 1,4 mg / 10 mg",
          Brand: "",
          dose: "3ml",
          checked: false,
        },
        {
          id: "4008491119771",
          name: "Immusan C 800 Depot Complex",
          Brand: "",
          dose: "3 ul",
          checked: false,
        },
      ],
      scannResult: "Please scan the barcode of the drugs",
      hasError: false,
    }
  },
  mounted() {
    this.startScann();

  },
  methods: {
    closeAlert() {
      this.hasError = false;
    },
    searchIsDrugOnTheList(id) {
      this.hasError = false;
      let f = false;
      this.drugs.forEach(function(drug) {
        if (drug.id == id) {
          drug.checked = true;
          f = true;
        }
      });
      if (f == false) {
        console.log("xxxx");
        this.hasError = true;
      }
    },
    startScann() {
      let vm = this;
      codeReader
        .listVideoInputDevices()
        .then(videoInputDevices => {
          vm.videoInputDevices = videoInputDevices;
          vm.readCode();
        })
        .catch(err => console.error(err));
    },
    readCode() {
      let vm = this;
      codeReader.decodeFromVideoDevice(vm.videoInputDevices[vm.videoInputDevice % vm.videoInputDevices.length].deviceId, 'video', (result, err) => {
              if (result) {
                vm.searchIsDrugOnTheList(result.text);
                vm.scannResult = result.text;
                console.log(result)
              }
              if (err && !(err instanceof NotFoundException)) {
                console.error(err)
                document.getElementById('result').textContent = err
              }
            })
    },
    nextViedeoInputDevices() {
      let vm = this;
      codeReader.reset();
      vm.videoInputDevice++;
      vm.startScann();
    }
  },
  props: {
    // msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mu-scale-transition-enter-active,
.mu-scale-transition-leave-active {
  transition: transform .45s cubic-bezier(0.23, 1, 0.32, 1), opacity .45s cubic-bezier(0.23, 1, 0.32, 1);
  backface-visibility: hidden;
}

.mu-scale-transition-enter,
.mu-scale-transition-leave-active {
  transform: scale(0);
  opacity: 0;
}
</style>
