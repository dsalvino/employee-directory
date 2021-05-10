
import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import upArrow from "./images/arrow-up.svg";
import downArrow from "./images/arrow-down.svg";

const EmployeeInfo = () => {
    const [users, setUsers] = useState([]);
    const [names, setNames] = useState([]);
    const [lookup, setLookup] = useState('');
    useEffect(() => {
        axios
            .get('https://randomuser.me/api/?results=50&nat=us')
            .then(function (random) {
                setUsers(random.data.results);
                setNames(random.data.results);
            });
    }, []);


    const handleSearch = ({ target }) => {
        const { value } = target;
        setLookup(value);
        if (!lookup) setNames(users);
        else {
            const filterUsers = users.filter((items) => {
                return (
                    items.name.first.includes(value) || items.name.last.includes(value) ||
                    items.email.includes(value)
                );
            });
            setNames(filterUsers);
        }
    };
    const handleUpArrowSort = () => {
        let copy = [...names];
        let sortedArray = copy.sort(sortAlphabetically);
        console.log(sortedArray);
        setNames(sortedArray)
    }
    const handleDownArrowSort = () => {
        let copy = [...names];
        let sortedArray = copy.sort(sortAlphabeticallyReverse);
        console.log(sortedArray);
        setNames(sortedArray)
    }

    const sortAlphabetically = (a, b) => {
        var nameA = a.name.first.toUpperCase();
        var nameB = b.name.first.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

    const sortAlphabeticallyReverse = (a, b) => {
        var nameA = a.name.first.toUpperCase();
        var nameB = b.name.first.toUpperCase();
        if (nameA < nameB) {
            return 1;
        }
        if (nameA > nameB) {
            return -1;
        }
        return 0;
    }

    return (

        <div className="container mt-5 mainContainer">
            <div className="card ">
                <form className="form mt-5 ">
                    <input
                        className="form-control w-25 mx-auto shadow-lg text-center"
                        type="search"
                        placeholder="Search Employee"
                        name="search"
                        onChange={handleSearch}
                        value={lookup}
                    />
                </form>

                <table className="table mt-5">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col"> </th>
                            <th scope="col">
                                First Name
                                <img
                                    className="sort"
                                    src={upArrow}
                                    style={{ height: 'auto', width: '20px', margin: '5px' }}
                                    onClick={handleUpArrowSort}
                                    alt="UpArrow"
                                />
                                <img
                                    className="sort"
                                    src={downArrow}
                                    style={{ height: '22px', width: 'auto', margin: '5px' }}
                                    onClick={handleDownArrowSort}
                                    alt="DownArrow"
                                />
                            </th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email Address</th>
                            <th scope="col">Phone Number</th>
                        </tr>
                    </thead>

                    <tbody className="ml-5">
                        {names.map((item) => (
                            <tr key={item.login.uuid}>
                                <th scope="row " >
                                    {' '}
                                    <img src={item.picture.medium} alt="" />{' '}
                                </th>
                                <td>{item.name.first}</td>
                                <td>{item.name.last}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeInfo;