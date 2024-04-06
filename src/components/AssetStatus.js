import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap";
import DataTable from "../components/DataTable";
import { MdAdd } from "react-icons/md";
import axios from "axios";
import AddGSModal from "./AddGSModal";
import AddSATModal from "./AddSATModal";
import styles from "../styles/dashboard.module.scss";


const columns = [
    {
      Header: "GS",
      accessor: "gs",
    },
    {
      Header: "In Contact",
      accessor: "inContact",
    },
    {
      Header: "Duration",
      accessor: "duration",
    },
    {
      Header: "Lost of signal",
      accessor: "lostOfSignal",
    },
];

// when you add API Url just comment this
const data = [
    {
      gs: 1,
      inContact: "SAT 1",
      duration: "10 minutes",
      lostOfSignal: "16:30:00",
    },
    {
      gs: 1,
      inContact: "False",
      duration: "False/O",
      lostOfSignal: "00:00:00",
    },
    {
      gs: 1,
      inContact: "SAT 4",
      duration: "12 minutes",
      lostOfSignal: "18:40:00",
    },
];

const columns2 = [
    {
      Header: "SAT",
      accessor: "sat", // Property name in your data
    },
    {
      Header: "Storage Current",
      accessor: "storageCurrent",
    },
    {
      Header: "Main",
      accessor: "main",
    },
    {
      Header: "Out",
      accessor: "out",
    },
    {
      Header: "Power",
      accessor: "power",
    },
];

// when you add API Url just comment this
const data2 = [
    {
      sat: 1,
      storageCurrent: "32gb",
      main: "False",
      out: "False",
      power: "Eclipse",
    },
    {
      sat: 2,
      storageCurrent: "16gb",
      main: "True",
      out: "False",
      power: "Sunlight",
    },
];

const AssetStatus = () => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    useEffect(() => {
        // just change the url and uncomment the inner code
        // axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
        //   setData(response.data);
        // });
    }, []);

    return (
        <>
            <div className={styles.dashboardContentRow}>
                <div className={styles.TableCol}>
                    <div className={styles.TableHeading}>
                        <div className={styles.assetsDropdown}>
                            <Button
                                type="button"
                                className={styles.assetsDropdownBtn}
                                onClick={() => setOpenDropdown(!openDropdown)}
                            >
                                <MdAdd />
                                Add Assets
                                {/* {dropdown1 ? <IoIosArrowUp /> : <IoIosArrowDown />} */}
                            </Button>
                            {openDropdown && (
                                <div className={styles.assetsDropdownMenu}>
                                    <Button
                                        type="button"
                                        onClick={() => setShowModal1(true)}
                                    >
                                        <span>Add Station</span>
                                    </Button>
                                    <Button
                                        type="button"
                                        onClick={() => setShowModal2(true)}
                                    >
                                        <span>Add Satellite</span>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <DataTable
                        search={false}
                        tablePagination={true}
                        columns={columns}
                        data={data}
                        rowSeletion={false}
                        actionBtn={false}
                        actionBtnText=""
                    />
                    <hr />
                    <DataTable
                        search={false}
                        tablePagination={true}
                        columns={columns2}
                        data={data2}
                        rowSeletion={false}
                        actionBtn={false}
                        actionBtnText=""
                    />
                </div>
            </div>
            <AddGSModal showModal1={showModal1} setShowModal1={setShowModal1} />
            <AddSATModal showModal2={showModal2} setShowModal2={setShowModal2} />
        </>
    )
}

export default AssetStatus