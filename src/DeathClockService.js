import DeathClockModel from './DeathClockModel';

class DeathClockService {
    constructor() {
        this.model = new DeathClockModel();
    }

    calculateLifeExpectancy(userData) {
        const { birthDate, lifestyle } = userData;
        return this.model.calculateLifeExpectancy(birthDate, lifestyle);
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    formatYears(years) {
        return Math.round(years * 10) / 10;
    }

    validateUserData(userData) {
        const errors = {};

        if (!userData.birthDate) {
            errors.birthDate = 'Birth date is required';
        } else {
            const birthDate = new Date(userData.birthDate);
            const today = new Date();
            if (birthDate > today) {
                errors.birthDate = 'Birth date cannot be in the future';
            }
        }

        if (!userData.lifestyle) {
            errors.lifestyle = 'Lifestyle factors are required';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}

export default DeathClockService; 