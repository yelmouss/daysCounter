import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Font from 'react-font';

function AgeCalculator() {
    const birthDate = new Date('1995-10-09');
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());

    if (today > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const [age, setAge] = useState(calculateAge(birthDate, today));
    const [countdown, setCountdown] = useState(calculateCountdown(today, nextBirthday));

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
                if (prevCountdown.days === 0 && prevCountdown.hours === 0 && prevCountdown.minutes === 0 && prevCountdown.seconds === 0) {
                    clearInterval(timer);
                    return prevCountdown;
                }

                let newDays = prevCountdown.days;
                let newHours = prevCountdown.hours;
                let newMinutes = prevCountdown.minutes;
                let newSeconds = prevCountdown.seconds;

                if (newSeconds === 0) {
                    newSeconds = 59;
                    if (newMinutes === 0) {
                        newMinutes = 59;
                        if (newHours === 0) {
                            newHours = 23;
                            if (newDays > 0) {
                                newDays--;
                            }
                        } else {
                            newHours--;
                        }
                    } else {
                        newMinutes--;
                    }
                } else {
                    newSeconds--;
                }

                return {
                    days: newDays,
                    hours: newHours,
                    minutes: newMinutes,
                    seconds: newSeconds
                };
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setAge(prevAge => {
                return {
                    years: prevAge.years + 1,
                    days: prevAge.days
                };
            });
        }, 365 * 24 * 60 * 60 * 1000); // Met à jour l'âge chaque année

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <Container className='d-flex align-items-center justify-content-center p-5 fs-1 text-light text-center'>
            <Font family='Dancing Script'>
                <Row>
                    <Col className='card  bg-light bg-opacity-50 fw-bolder text-black p-2'>
                   Ton age maintenant Âge: {age.years} ans
                <br></br>
                  tu as vécu  {age.days} jours dans cet univers
                    </Col>
                </Row>
                <div className='mt-5 card bg-light bg-opacity-50 fw-bolder text-black p-2'>
         
                    {countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0 ? (
                        <div>
                            Aujourd'hui, c'est ton anniversaire!, Joyeux anniversaire mon amour !!!
                            <br />
                        </div>
                    ) : (
                        <div>
                            Il reste {countdown.days} jours, {countdown.hours} heures, {countdown.minutes} minutes, {countdown.seconds} secondes jusqu'au prochain anniversaire le 09/10/2023.
                        </div>
                    )}
                </div>
            </Font>
        </Container>
    );
}

function calculateAge(birthDate, today) {
    const ageInMilliseconds = today - birthDate;
    const years = Math.floor(ageInMilliseconds / (365 * 24 * 60 * 60 * 1000));
    const days = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));
    return { years, days };
}

function calculateCountdown(today, nextBirthday) {
    const diffMilliseconds = nextBirthday - today;
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;
    const remainingSeconds = diffSeconds % 60;
    return { days: Math.floor(diffHours / 24), hours: diffHours % 24, minutes: remainingMinutes, seconds: remainingSeconds };
}

export default AgeCalculator;
