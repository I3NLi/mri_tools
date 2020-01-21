<template>
<mu-card style="width: 100%;  margin: 0 auto; ">
  <mu-card-header title="No patient specified" sub-title="" @click="$router.push('/')">
    <mu-avatar slot="avatar">
      <i class="material-icons">
        accessible_forward
      </i>
    </mu-avatar>
  </mu-card-header>
  <mu-card-media sub-title="Please scan the patient ID">
    <i class="material-icons" style="
    margin-top: px;
    color: beige;
    bottom: 16px;
    right: 16px;
    position: absolute;
    font-size: 1.6em;
    z-index: 999999999;" @click="nextViedeoInputDevices()">
      sync
    </i>
    <video id="video" width="100%" height="100%" />
  </mu-card-media>
  <mu-card-title title="" sub-title="Or enter patient ID manually"></mu-card-title>

  <mu-card-text>
    <mu-text-field v-model="scannResult" placeholder="Please input......"></mu-text-field><br />
  </mu-card-text>
  <mu-card-actions>
    <mu-button flat @click="reset">Reset</mu-button>
    <mu-button flat @click="confirm">Confirm</mu-button>
  </mu-card-actions>
</mu-card>
</template>

<script>
import {
  BrowserMultiFormatReader,
  NotFoundException
} from '@zxing/library';

const codeReader = new BrowserMultiFormatReader();

export default {
  name: 'Home',
  data() {
    return {
      videoInputDevices: undefined,
      videoInputDevice: 0,
      drugs: [{
          id: "12345678909876543",
          name: "Dolo-Dobendan® 1,4 mg / 10 mg",
          Brand: "",
          dose: "3ml",
          checked: false,
        },
        {
          id: "12345678909876543",
          name: "Dolo-Dobendan® 1,4 mg / 10 mg",
          Brand: "",
          dose: "3ml",
          checked: true,
        },
      ],
      scannResult: "",
      hasError: false,
    }
  },
  mounted() {
    this.startScann();

  },
  methods: {
    reset() {
      this.scannResult = "";
    },
    confirm() {
      this.$router.push('/patientDashboard');
    },
    closeAlert() {
      this.hasError = false;
    },
    searchIsDrugOnTheList(id) {
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
      codeReader
      .decodeFromInputVideoDevice(vm.videoInputDevices[vm.videoInputDevice % vm.videoInputDevices.length].deviceId, 'video')
        .then(result => {
          vm.scannResult = result.text;
          vm.$router.push('/patientDashboard');
          console.log(result);
        })
        .catch(err => console.error(err));
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
