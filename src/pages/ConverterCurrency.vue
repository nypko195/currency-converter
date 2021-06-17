<template>
	<base-converter>
		<div class="first__converter">
			<select v-model="firstSelectedTicker" @click="inputDisplayControl">
				<option disabled>Выберите валюту</option>
				<option
				selected="selected"
				v-for="ticker in tickerList"
				:key="ticker.ID"
				:charCode="ticker.CharCode">
				{{ ticker.CharCode }}
				</option>
			</select>
			<converter-item
				v-for="ticker in infoFirstConverter.firstArrayConverter"
				:key="ticker.ID"
				:name="ticker.Name">
			</converter-item>

			<input
				type="text"
				v-model="converterValueUser"
				:class="{ isDisplayBlock }"
				placeholder="Введите значение"
			/>
		</div>

		<button @click="swapConverterValue">Меняет местами</button>

		<div class="last__converter">
			<select v-model="secondSelectedTicker">
				<option disabled>Выберите валюту</option>
				<option
					v-for="ticker in tickerList"
					:key="ticker.ID"
					:charCode="ticker.CharCode"
				>
					{{ ticker.CharCode }}
				</option>
			</select>
			<converter-item
				v-for="ticker in infoSecondConverter.secondArrayConverter"
				:key="ticker.ID"
				:name="ticker.Name"
				:value="calcConverter()"
			>
			</converter-item>
		</div>
	</base-converter>
</template>

<script>
	import BaseConverter from '../Base/BaseConverter.vue';
	import ConverterItem from '../components/ConverterItem.vue';

	export default {
		components: {
			BaseConverter,
			ConverterItem,
		},
		data() {
			return {
				firstSelectedTicker: '',
				infoFirstConverter: {
					valueFirst: '',
					firstNominalConverter: '',
					firstArrayConverter: [],
					isDisplayInput: null,
				},

				secondSelectedTicker: '',
				infoSecondConverter: {
					valueLast: '',
					secondNomanilConveter: '',
					secondArrayConverter: [],
				},

				converterValueUser: '',		
			};
		},
		methods: {
			calcConverter() {				
				const { valueFirst, firstNominalConverter } = this.infoFirstConverter;
				const { valueLast, secondNomanilConveter } = this.infoSecondConverter;
				
				let result = (this.converterValueUser * firstNominalConverter * valueLast ) / 
					(secondNomanilConveter * valueFirst);

				return result.toFixed(2);				
			},
			swapConverterValue() {
				const temporaryArrayFirstConveter = this.infoFirstConverter.firstArrayConverter;
				const temporaryArraySecondConveter = this.infoSecondConverter.secondArrayConverter;
				this.infoFirstConverter.firstArrayConverter = temporaryArraySecondConveter;
				this.infoSecondConverter.secondArrayConverter = temporaryArrayFirstConveter;

				const temporaryValueFirstConverter = this.firstSelectedTicker;
				const temporaryValueLastConverter = this.secondSelectedTicker;
				this.firstSelectedTicker = temporaryValueLastConverter;
				this.secondSelectedTicker = temporaryValueFirstConverter;
			},
			inputDisplayControl() {
				if (!this.firstSelectedTicker == '') {
				this.infoFirstConverter.isDisplayInput = true;
				}
			},
		},
		computed: {
			tickerList() {
				return this.$store.state.tickerList;
			},
			isDisplayBlock() {
				return this.infoFirstConverter.isDisplayInput == true;
			},
		},
		created() {
			this.$store.dispatch('getTickers');
		},
		watch: {
			firstSelectedTicker() {				
				this.infoFirstConverter.firstArrayConverter = this.tickerList.filter(
				(tic) => tic.CharCode == this.firstSelectedTicker);

				for (let item of this.infoFirstConverter.firstArrayConverter) {
				let nominal = item.Nominal;
				let valueSelectedCurrency = item.Value;
				const rateInRubles = 1000 / (valueSelectedCurrency / nominal);
				const course = (rateInRubles * nominal) / 1000;
				return (this.infoFirstConverter.valueFirst = course), 
				(this.infoFirstConverter.firstNominalConverter = nominal);
				}
			},
			secondSelectedTicker() {
				this.infoSecondConverter.secondArrayConverter = this.tickerList.filter(
				(tic) => tic.CharCode == this.secondSelectedTicker);

				for (let item of this.infoSecondConverter.secondArrayConverter) {
				let nominal = item.Nominal;
				let valueSelectedCurrency = item.Value;
				const rateInRubles = 1000 / (valueSelectedCurrency / nominal);
				const course = (rateInRubles * nominal) / 1000;
				return (this.infoSecondConverter.valueLast = course),
				(this.infoSecondConverter.secondNomanilConveter = nominal);
				}
			},
		},
	};
</script>

<style scoped>
	select {
		width: 60px;
	}

	div {
		display: flex;
		justify-content: center;
		
	}

	.first__converter {
		margin: 15px;
		border: 1px solid #333;
		margin: 0 auto;
		padding: 5px;
		flex: 0 0 40%;
	}

	.last__converter {
		margin: 15px;
		border: 1px solid #333;
		margin: 0 auto;
		padding: 5px;
		flex: 0 0 40%;
		
	}

	input {
		display: none;
		text-align: center;
		border-bottom: 1px solid #333;
	}

	.isDisplayBlock {
		display: block;
	}

	button {
		cursor: pointer;
		margin: 0 auto;
	}

	select {
		cursor: pointer;
	}

	@media (max-width: 992px) {
		button {
			width: 74px;
			margin: 10px auto;
		}

		.first__converter {
			width: 370px;
			align-items: center;
		}

		.last__converter {
			width: 370px;
			align-items: center;
		}

		input {
			padding: 5px;
		}
	}

	@media (max-width: 576px) {
		.first__converter {
			flex-direction: column;
			width: 260px;
		}

		.last__converter {
			flex-direction: column;
			width: 260px;
		}
	}
</style>