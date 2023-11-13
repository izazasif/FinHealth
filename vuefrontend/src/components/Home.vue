
<script >
import { onMounted } from "vue";
import tblApi from "../composables/tblapi.js";
import axios from  'axios'

const { tblData, error, getAlltbl } = tblApi();

onMounted(getAlltbl);
export default {
  data() {
    return {
      monthlyIncome: null,
      monthlyExpenses: null,
      totalDebts: null,
      totalAssets: null,
      financialHealthScore: null,
    };
  },
  methods: {
    async calculateScore() {
      const incomeExpenseRatio = this.monthlyIncome / this.monthlyExpenses;
      const debtToIncomeRatio = this.totalDebts / this.monthlyIncome;
      const assetValue = this.totalAssets;
      this.financialHealthScore = (incomeExpenseRatio * 0.4 + (1 - debtToIncomeRatio) * 0.3 + assetValue * 0.3) * 100;


      const inputData = {
        monthlyIncome: this.monthlyIncome,
        monthlyExpenses: this.monthlyExpenses,
        totalDebts: this.totalDebts,
        totalAssets: this.totalAssets,
        financialHealthScore: this.financialHealthScore,
      };
      try {
        const response = await axios.post('http://localhost:8000/api/tbl', inputData);
        console.log(response.data);
        this.financialHealthScore = response.data.data.financialHealthScore;
      } catch (error) {
        console.error('Error sending data to the backend:', error);
      }
      this.monthlyIncome = null;
      this.monthlyExpenses = null;
      this.totalDebts = null;
      this.totalAssets = null;
    },
  },
};
</script>
<template>
  <body>
    <div v-if="error">Oops! Error encountered: {{ error.message }}</div>
      <div v-else-if="tblData">
        <div v-for="({ id, monthlyIncome, monthlyExpenses,totalDebts,totalAssets,financialHealthScore }, i) in tblData" :key="id">
          <h2>
            {{ ++i }}
            {{ monthlyIncome }}
            {{ monthlyExpenses }}
            {{ totalDebts }}
            {{ totalAssets }}
            {{ financialHealthScore }}
          </h2>
        </div>
   </div>
    <form @submit.prevent="calculateScore">
      <div v-if="financialHealthScore !== null">
        <h5>Save Successfully</h5>
      <h5>Financial Health Score:</h5>
      <p style="margin-top:-11px;">{{ financialHealthScore }}</p>
    </div> 
        <label for="name">Monthly Income:</label>
        <input type="number" id="monthlyIncome" v-model="monthlyIncome" required />

        <label for="email">Monthly Expenses:</label>
        <input type="number" id="monthlyExpenses" v-model="monthlyExpenses" required />

        <label for="name">Total Debts:</label>
        <input type="number" id="totalDebts" v-model="totalDebts" required />

        <label for="email">Total Assets:</label>
        <input type="number" id="totalAssets" v-model="totalAssets" required />

        <button type="submit">Calculate</button>
    </form>
</body>
</template>


<style  scoped>
   body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            /* display: flex; */
            justify-content: left;
            align-items: center;
            height: 100vh;
        }

        form {
            background-color: #fff;
            margin-left: 10px;
            padding: 60px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            color: #333;
        }

        input {
            width: 100%;
            padding: 8px;
            margin-bottom: 16px;
            box-sizing: border-box;
        }

        button {
            background-color: #4caf50;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }
        @media screen and (max-width: 600px) {
            form {
                width: 63%;
            }
        }
</style>


