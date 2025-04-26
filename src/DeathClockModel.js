class DeathClockModel {
    constructor() {
        this.baseLifeExpectancy = 78.7; // Average life expectancy
        this.factors = {
            smoking: {
                options: [
                    { text: "Never smoked", value: 0, impact: 0 },
                    { text: "Former smoker (quit >5 years ago)", value: 1, impact: -2 },
                    { text: "Former smoker (quit <5 years ago)", value: 2, impact: -4 },
                    { text: "Occasional smoker", value: 3, impact: -6 },
                    { text: "Regular smoker", value: 4, impact: -10 }
                ]
            },
            exercise: {
                options: [
                    { text: "Sedentary (no exercise)", value: 0, impact: -5 },
                    { text: "Light exercise (1-2 times/week)", value: 1, impact: -2 },
                    { text: "Moderate exercise (3-4 times/week)", value: 2, impact: 0 },
                    { text: "Regular exercise (5-6 times/week)", value: 3, impact: 3 },
                    { text: "Intense exercise (daily)", value: 4, impact: 5 }
                ]
            },
            diet: {
                options: [
                    { text: "Poor (fast food, processed)", value: 0, impact: -5 },
                    { text: "Below average (unbalanced)", value: 1, impact: -2 },
                    { text: "Average (mixed)", value: 2, impact: 0 },
                    { text: "Good (balanced)", value: 3, impact: 2 },
                    { text: "Excellent (whole foods, plant-based)", value: 4, impact: 5 }
                ]
            },
            alcohol: {
                options: [
                    { text: "Never drink", value: 0, impact: 0 },
                    { text: "Occasional (1-2 drinks/month)", value: 1, impact: -1 },
                    { text: "Moderate (1-2 drinks/week)", value: 2, impact: -2 },
                    { text: "Regular (3-4 drinks/week)", value: 3, impact: -4 },
                    { text: "Heavy (daily)", value: 4, impact: -8 }
                ]
            },
            stress: {
                options: [
                    { text: "Very low stress", value: 0, impact: 2 },
                    { text: "Low stress", value: 1, impact: 0 },
                    { text: "Moderate stress", value: 2, impact: -2 },
                    { text: "High stress", value: 3, impact: -4 },
                    { text: "Very high stress", value: 4, impact: -6 }
                ]
            },
            sleep: {
                options: [
                    { text: "Poor (<5 hours)", value: 0, impact: -5 },
                    { text: "Below average (5-6 hours)", value: 1, impact: -2 },
                    { text: "Average (6-7 hours)", value: 2, impact: 0 },
                    { text: "Good (7-8 hours)", value: 3, impact: 2 },
                    { text: "Excellent (8+ hours)", value: 4, impact: 3 }
                ]
            },
            genetics: {
                options: [
                    { text: "Excellent (parents lived >90)", value: 0, impact: 5 },
                    { text: "Good (parents lived 80-90)", value: 1, impact: 2 },
                    { text: "Average (parents lived 70-80)", value: 2, impact: 0 },
                    { text: "Below average (parents lived 60-70)", value: 3, impact: -3 },
                    { text: "Poor (parents died before 60)", value: 4, impact: -5 }
                ]
            }
        };
    }

    calculateLifeExpectancy(birthDate, factors) {
        let lifeExpectancy = this.baseLifeExpectancy;

        // Apply lifestyle factors
        for (const [factor, value] of Object.entries(factors)) {
            if (this.factors[factor]) {
                const option = this.factors[factor].options[value];
                lifeExpectancy += option.impact;
            }
        }

        // Calculate remaining years
        const today = new Date();
        const birth = new Date(birthDate);
        const currentAge = (today - birth) / (1000 * 60 * 60 * 24 * 365.25);
        const remainingYears = lifeExpectancy - currentAge;

        return {
            totalLifeExpectancy: Math.max(currentAge, lifeExpectancy),
            remainingYears: Math.max(0, remainingYears),
            estimatedDeathDate: new Date(today.getTime() + (remainingYears * 365.25 * 24 * 60 * 60 * 1000)),
            factors: this.factors
        };
    }
}

export default DeathClockModel; 