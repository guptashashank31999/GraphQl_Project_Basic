import { useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { GET_ALL_QUOTES } from '../GqlOperations/queries'

const Home = () => {
    const { loading, error, data } = useQuery(GET_ALL_QUOTES);


    if (loading) {
        return <h2>Loading....</h2>
    }
    if (error) {
        console.log('error', error)
    }
    //     useEffect(() => {
    //         fetch('http://localhost:4000', {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify({
    //                 query: `
    //                 query 
    //                 getUserById($userID: String!) {
    //   userBasedQuotes(_id: $userID) {
    //     name

    //   }
    // }`,

    //                 variable: {
    //                     userID:"6826e5190bb4928bc76c93d8"
    //                 }
    //             })
    //         }).then(async (res) => {

    //             let data = await res.json();

    //             console.log('data', data)

    //         })
    //     }, [])
    return (
        <>
            <h1>Home Page</h1>
            <hr />
            <table>
                <thead>
                    <th>
                        <td>Sno</td>
                        <td>Today Quotes</td>
                        <td>Written by</td>
                    </th>
                </thead>
                <tbody>
                    {
                        data != undefined && data?.allQuotes?.map((item, index) => {
                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>Today Quotes:-{item.name}</td>
                                    <td>Written By:-{item.by.firstName}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Home
