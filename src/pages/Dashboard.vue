<template>
  <div class="content">
    <div class="md-layout">
      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>description</md-icon>
          </template>

          <template slot="content">
            <p class="category">
              <strong
                >Please fill some questions for a better suggestion</strong
              >
            </p>

            <md-radio v-model="isConvolutionalApplication" :value="false"
              >My model <strong>will not</strong> need to work processing
              images</md-radio
            >
            <md-radio v-model="isConvolutionalApplication" :value="true"
              >My model will work with images processing</md-radio
            >

            <md-field v-if="!isConvolutionalApplication">
              <label>How many features?</label>
              <md-input type="number" v-model="input.features"></md-input>
              <span class="md-helper-text"
                >Ex: weight, height, shape, color... As many as your model
                has.</span
              >
            </md-field>

            <div v-else>
              <md-field>
                <label>What is the height in pixels of the image?</label>
                <md-input type="number" v-model="input.height"></md-input>
                <span class="md-helper-text"
                  >Here you fill the <strong>height</strong> in pixels.</span
                >
              </md-field>

              <md-field>
                <label>What is the width in pixels of the image?</label>
                <md-input type="number" v-model="input.width"></md-input>
                <span class="md-helper-text"
                  >Here you fill the <strong>width</strong> in pixels.</span
                >
              </md-field>
            </div>

            <md-field>
              <label>What accuracy value do you want?</label>
              <md-input type="number" v-model="input.accuracy"></md-input>
              <span class="md-helper-text"
                >Here you fill the number of accuracy that you hope for your
                model</span
              >
            </md-field>

            <md-field>
              <label>What reliability value do you want?</label>
              <md-input type="number" v-model="input.reliability"></md-input>
              <span class="md-helper-text"
                >Here you fill the number of reliability that you hope for your
                model</span
              >
            </md-field>
            <BR />
            <md-subheader
              >Have you considered using a neural network? Can you suggest an
              basic architecture?</md-subheader
            >

            <md-field>
              <label>Neurons?</label>
              <md-input type="number" v-model="input.neurons"></md-input>
              <span class="md-helper-text">Number of neurons suggested</span>
            </md-field>

            <md-field>
              <label>Layers?</label>
              <md-input type="number" v-model="input.layers"></md-input>
              <span class="md-helper-text">Number of layers suggested</span>
            </md-field>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-button @click="sendData" class="md-primary">SEND!</md-button>
            </div>
          </template>
        </stats-card>
      </div>

      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>info_outline</md-icon>
          </template>

          <template slot="content">
            <p class="category"><strong>VC Dims</strong></p>
            <BR />
            <ul v-for="item in simulationData" :key="item.index">
              <h3 class="title">{{ item.model + " " + item.vcdim }}</h3>
            </ul>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Valid data of last request
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>content_copy</md-icon>
          </template>

          <template slot="content">
            <p class="category"><strong>Minimal Samples</strong></p>
            <BR />
            <ul v-for="item in simulationData" :key="item.index">
              <h3 class="title">{{ item.model + " " + item.minimalSample }}</h3>
            </ul>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>date_range</md-icon>
              Valid data of last request
            </div>
          </template>
        </stats-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
      >
        <chart-card
          v-if="showChart"
          :chart-data="minimalSamplesChart.data"
          :chart-options="minimalSamplesChart.options"
          chart-type="Line"
          data-background-color="green"
        >
          <template slot="content">
            <h4 class="title">
              Machine Learning Algorithms Minimal Samples Comparison
            </h4>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              Based on last input profile
            </div>
          </template>
        </chart-card>
      </div>

      <div
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50"
      >
        <md-card>
          <md-card-header data-background-color="orange">
            <h4 class="title">Relationship between Accuracy x Reliability</h4>
            <p class="category">Samples needed</p>
            <md-button @click="sendRelationship" class="md-transparent"
              >CALCULATE</md-button
            >
          </md-card-header>
          <md-card-content>
            <div>
              <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col" v-for="(headerTitle, i) in headerslowerBounds" :key="i">{{headerTitle}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, i) in lowerBoundsSamplesTable" :key="i">
          <th scope="row">{{ ++i }}</th>
          <td v-for="(col,j) in entry" :key="j">{{ col }}</td>

        </tr>
      </tbody>
    </table>
              <!-- <md-table v-model="lowerBoundsSamplesTable" >
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="ID">{{ item }}</md-table-cell>

                </md-table-row>
              </md-table> -->
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { StatsCard, ChartCard } from "@/components";

export default {
  components: {
    StatsCard,
    ChartCard,
  },
  mounted() {},
  methods: {
    sendData() {
      // mocky test request
      // https://run.mocky.io/v3/c5525a96-892e-474a-9227-b9d5db725a85

      if (this.isConvolutionalApplication) {
        this.input.features = this.input.height * this.input.width;
      }
      axios
        .get(
          "http://localhost:8080/runSimulations?features=" +
            this.input.features +
            "&neurons=" +
            this.input.neurons +
            "&layers=" +
            this.input.layers +
            "&accuracy=" +
            this.input.accuracy +
            "&reliability=" +
            this.input.reliability +
            "&range=" +
            this.input.range
        )
        .then((res) => {
          this.simulationData = res.data;

          console.log(res.data);
          console.log(res.data.map((t) => t.model));
          console.log(res.data.map((t) => t.minimalSample));
          const a = res.data.map((t) => t.minimalSample);
          const b = [[...a]];

          console.log(b);

          this.minimalSamplesChart.data.labels = res.data.map((t) => t.model);
          this.minimalSamplesChart.data.series = b;
          this.minimalSamplesChart.options.high = Math.max(a) + 10;
          this.showChart = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendRelationship() {
      if (this.isConvolutionalApplication) {
        this.input.features = this.input.height * this.input.width;
      }
      axios
        .get(
          "http://localhost:8080/lowerBoundsSamplesBetweenAccuracyAndReliability?features=" +
            this.input.features +
            "&neurons=" +
            this.input.neurons +
            "&layers=" +
            this.input.layers +
            "&model=" +
            this.input.model +
            "&range=" +
            this.input.range
        )
        .then((res) => {
          this.lowerBoundsSamplesTable = res.data;

          console.log("Headers LowerBounds Array:");
          this.headerslowerBounds = [...Array(this.input.range).keys()];
          console.log(this.headerslowerBounds);
          console.log("LowerBounds Array:");

          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  data() {
    return {
      isConvolutionalApplication: false,
      simulationData: [],
      showChart: false,
      lowerBoundsSamplesTable: [],
      headerslowerBounds: [],
      input: {
        features: 10,
        neurons: 5,
        layers: 5,
        accuracy: 0.99,
        reliability: 0.99,
        range: 20,
        height: 0,
        width: 0,
        model:"NEURAL_NETWORK",
        treeHeight:0
      },
      minimalSamplesChart: {
        data: {
          labels: [],
          series: [[]],
        },

        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
      },
    };
  },
};
</script>
