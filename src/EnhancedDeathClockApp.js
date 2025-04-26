import React, { useState } from 'react';
import DeathClockService from './DeathClockService';
import DeathClockModel from './DeathClockModel';
import './App.css';

const service = new DeathClockService();
const model = new DeathClockModel();

function EnhancedDeathClockApp() {
    const [birthDate, setBirthDate] = useState('');
    const [lifestyle, setLifestyle] = useState({
        smoking: 0,
        exercise: 0,
        diet: 0,
        alcohol: 0,
        stress: 0,
        sleep: 0,
        genetics: 0
    });
    const [result, setResult] = useState(null);
    const [errors, setErrors] = useState({});

    const handleLifestyleChange = (factor, value) => {
        setLifestyle(prev => ({
            ...prev,
            [factor]: parseInt(value)
        }));
    };

    const calculateLifeExpectancy = () => {
        const userData = {
            birthDate,
            lifestyle
        };

        const validation = service.validateUserData(userData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        const result = service.calculateLifeExpectancy(userData);
        setResult(result);
        setErrors({});
    };

    const renderFactorOptions = (factor) => {
        const options = model.factors[factor]?.options || [];
        return (
            <div className="factor-options">
                {options.map((option, index) => (
                    <div key={index} className="option-radio">
                        <input
                            type="radio"
                            id={`${factor}-${index}`}
                            name={factor}
                            value={option.value}
                            checked={lifestyle[factor] === option.value}
                            onChange={(e) => handleLifestyleChange(factor, e.target.value)}
                        />
                        <label htmlFor={`${factor}-${index}`}>{option.text}</label>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="death-clock-container">
            <h1>Death Clock Calculator</h1>
            <div className="input-section">
                <div className="birth-date-input">
                    <label>Birth Date:</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                    {errors.birthDate && <span className="error">{errors.birthDate}</span>}
                </div>

                <div className="lifestyle-factors">
                    <h2>Lifestyle Factors</h2>
                    {Object.keys(lifestyle).map(factor => (
                        <div key={factor} className="factor-group">
                            <h3>{factor.charAt(0).toUpperCase() + factor.slice(1)}</h3>
                            {renderFactorOptions(factor)}
                        </div>
                    ))}
                </div>

                <button onClick={calculateLifeExpectancy} className="calculate-button">
                    Calculate Life Expectancy
                </button>
            </div>

            {result && (
                <div className="results-section">
                    <h2>Your Results</h2>
                    <p>Total Life Expectancy: {service.formatYears(result.totalLifeExpectancy)} years</p>
                    <p>Remaining Years: {service.formatYears(result.remainingYears)} years</p>
                    <p>Estimated Death Date: {service.formatDate(result.estimatedDeathDate)}</p>
                </div>
            )}
        </div>
    );
}

export default EnhancedDeathClockApp; 