import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Font from 'react-font';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function AgeCalculator() {
    const birthDate = new Date('1995-10-09');
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate(), 0, 0, 0, 0);

    // Si la date d'anniversaire est dans le passé par rapport à aujourd'hui,
    // ajoutez un an à la date de l'anniversaire pour obtenir la prochaine date d'anniversaire.
    if (today > nextBirthday) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }

    const ageYears = today < nextBirthday ? today.getFullYear() - birthDate.getFullYear() : today.getFullYear() - birthDate.getFullYear() - 1;
    const ageDays = Math.floor((today - birthDate) / (24 * 60 * 60 * 1000));

    const [age, setAge] = useState({ years: ageYears, days: ageDays });
    const [countdown, setCountdown] = useState(calculateCountdown(today, nextBirthday));

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => {
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

    function calculateCountdown(today, nextBirthday) {
        const diffMilliseconds = nextBirthday - today;
        const diffSeconds = Math.floor(diffMilliseconds / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const remainingMinutes = diffMinutes % 60;
        const remainingSeconds = diffSeconds % 60;
        return { days: Math.floor(diffHours / 24), hours: diffHours % 24, minutes: remainingMinutes, seconds: remainingSeconds };
    }

    return (
        <Container className='d-flex align-items-center justify-content-center p-5 fs-1 text-light text-center'>
            <Font family='Dancing Script'>
                <Tabs
                    defaultActiveKey="home"
                    id="fill-tab-example"
                    className="mb-3"
                    fill
                >
                    <Tab eventKey="home" title="Your Age" >
                        <Row>
                            <Col className='card bg-light bg-opacity-50 fw-bolder text-black p-2'>
                                Ton âge maintenant: {age.years} ans
                                <br />
                                Tu as vécu {age.days} jours dans cet univers
                            </Col>
                        </Row>
                        <div className='mt-5 card bg-light bg-opacity-50 fw-bolder text-black p-2'>
                            {countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0 ? (
                                <div>
                                    Aujourd'hui, c'est ton anniversaire! Joyeux anniversaire mon amour !!!
                                    <br />
                                </div>
                            ) : (
                                <div>
                                    Il reste {countdown.days} jours, {countdown.hours} heures, {countdown.minutes} minutes, {countdown.seconds} secondes jusqu'au prochain anniversaire le 09/10/2023.
                                </div>
                            )}
                        </div>
                    </Tab>
                    <Tab eventKey="profile" title="Your Lover's message">

                        <div className='bg-dark text-light bg-opacity-75 rounded'>
                        <p className='p-5'>
                            In a world filled with countless moments, some people come into our lives and leave a lasting impact that words can scarcely capture. Racha is one of those extraordinary souls whose existence brings an indescribable joy to my life. As I reflect upon her presence, I find myself overwhelmed with gratitude for the simple fact that she exists.

                            Racha, your existence is a gift that keeps on giving. Your laughter, your kindness, and the way you brighten up every room you enter are nothing short of inspiring. In a world sometimes filled with chaos, your presence is a beacon of light and serenity. The positivity you radiate is contagious, making everyone around you feel valued and loved.

                            I want to express my deepest gratitude for your existence. Thank you for being exactly who you are. Your uniqueness is a treasure, and I am endlessly thankful for the moments we share and the memories we create together. Your existence enriches not just my life, but the lives of everyone fortunate enough to know you.

                            As for me, Yassine, words falter in capturing the depth of my feelings for you, Racha. My love for you is as vast as the sky, as constant as the North Star. Your presence in my life is a blessing beyond measure. I cherish every smile, every conversation, and every shared silence. Your love has illuminated my world in ways I never thought possible, and for that, I am eternally grateful.

                            Racha, I love you more than words can express. Thank you for being in my life and gracing me with your love and presence. You are cherished, appreciated, and adored beyond measure.
                        </p>

                        <div className='text-end'>
                            <p>Yassine ELMOUSS</p>
                        </div>
                        </div>
              
                    </Tab>

                </Tabs>

            </Font>
        </Container>
    );
}

export default AgeCalculator;
