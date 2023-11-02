import React from 'react'
import styles from '../styles/dashBoardHeader.module.scss'
import { Container, Button , Form } from 'react-bootstrap'
import { FaBars } from 'react-icons/fa';
import { FiHome, FiSearch } from 'react-icons/fi';
import Link from 'next/link';

const DashboardHeader = ({ hideShowSidebar, setHideShowSidebar }) => {

    return (
        <div className={styles.dHeader}>
            <Container className={styles.container}>
                <div className={styles.dHeaderContent}>
                    <div className={styles.dHeaderInner}>
                        <Button type="button" className={styles.sidebarNavBtn} onClick={() => setHideShowSidebar(!hideShowSidebar)}>
                            <FaBars />
                        </Button>
                        <Link href="/" className={styles.homeLink}><FiHome /></Link>
                        <div className={styles.searchWrap}>
                            <Form.Control type="search" placeholder="search" />
                            <FiSearch />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default DashboardHeader