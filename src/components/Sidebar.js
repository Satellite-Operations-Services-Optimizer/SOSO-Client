import React, { useState } from 'react'
import styles from '../styles/sidebar.module.scss'
import { Button } from 'react-bootstrap'
import { useRouter } from 'next/router';
import { RxPieChart } from 'react-icons/rx';
import { CiShop } from 'react-icons/ci';
import { FaUserGroup} from 'react-icons/fa6';
import { FaUserCircle } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Link from 'next/link';

const Sidebar = ({hideShowSidebar}) => {
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [dropdown1, setDropdown1] = useState(true);
    const [dropdown2, setDropdown2] = useState(false);
    const [dropdown3, setDropdown3] = useState(false);
    const [dropdown4, setDropdown4] = useState(false);
    
    const className = open ? '' : styles.open;
    return (
        hideShowSidebar && <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
                <div className={styles.sidebarNavigation}>
                    <Button type="button" className={styles.dropdownBtn} onClick={() => setDropdown1(!dropdown1)}>
                        Activities {dropdown1 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </Button>
                    {dropdown1 && <div className={styles.dropdownMenu}>
                        <Link href="/" className={router.pathname === '/' ? styles.active : ''}><RxPieChart /><span>Memory Scrub</span></Link>
                        <Link href="/orbitManeuver" className={router.pathname === '/orbitManeuver' ? styles.active : ''}><CiShop/><span>Orbit Maneuver</span></Link>
                        <Link href="/orbitParameterUpdate" className={router.pathname === '/orbitParameterUpdate' ? styles.active : ''}><FaUserGroup/><span>Orbit Parameter Update</span></Link>
                        <Link href="/payloadDiagnosticActivity" className={router.pathname === '/payloadDiagnosticActivity' ? styles.active : ''}><FaUserCircle/><span>Payload Diagnostic Activity</span></Link>
                    </div>}
                </div>
                <div className={styles.sidebarNavigation}>
                    <Button type="button" className={styles.dropdownBtn} onClick={() => setDropdown2(!dropdown2)}>
                        Schedule Request {dropdown2 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </Button>
                    {dropdown2 && <div className={styles.dropdownMenu}>
                        <Link href="/maintenanceRequest" className={router.pathname === '/maintenanceRequest' ? styles.active : ''}><RxPieChart /><span>Maintenance Request Input Form</span></Link>
                        <Link href="/outageRequest" className={router.pathname === '/outageRequest' ? styles.active : ''}><RxPieChart/><span>Outage Request Input Form</span></Link>
                        <Link href="/" className={router.pathname === '/schedule' ? styles.active : ''}><CiShop/><span>Schedule page</span></Link>
                    </div>}
                </div>
                <div className={styles.sidebarNavigation}>
                    <Button type="button" className={styles.dropdownBtn} onClick={() => setDropdown3(!dropdown3)}>
                        Health Dashboard {dropdown3 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </Button>
                    {dropdown3 && <div className={styles.dropdownMenu}>
                        <Link href="/assetStatus" className={router.pathname === '/assetStatus' ? styles.active : ''}><RxPieChart /><span>Asset Status</span></Link>
                        <Link href="/addGS" className={router.pathname === '/addGS' ? styles.active : ''}><RxPieChart /><span>Add GS</span></Link>
                        <Link href="/addSAT" className={router.pathname === '/addSAT' ? styles.active : ''}><RxPieChart /><span>Add SAT</span></Link>
                    </div>}
                </div>
                <div className={styles.sidebarNavigation}>
                    <Button type="button" className={styles.dropdownBtn} onClick={() => setDropdown4(!dropdown4)}>
                        Image Request {dropdown4 ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </Button>
                    {dropdown4 && <div className={styles.dropdownMenu}>
                        <Link href="/imageOrders" className={router.pathname === '/imageOrders' ? styles.active : ''}><RxPieChart /><span>Image Orders</span></Link>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Sidebar