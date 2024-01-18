import React from 'react'
import styles from '../styles/dashBoardHeader.module.scss'
import { Container, Button } from 'react-bootstrap'
import { useRouter } from 'next/router';

const DashboardHeader = () => {
    const router = useRouter();
    return (
        <div className={styles.dHeader}>
            <Container className={styles.container}>
                <div className={styles.dHeaderContent}>
                    {router.pathname === '/' ? "" :
                    <div className={styles.mainSearch}>
                        <div className={styles.searchBar}>
                            <div className={styles.searchBoxWithIcon}>
                                <div className={styles.searchBoxIcon}>
                                    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.5 11h-.79l-.28-.27A6.471 6.471 0 0 0 13 6.5 6.5 6.5 0 1 0 6.5 13c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L17.49 16l-4.99-5zm-6 0C4.01 11 2 8.99 2 6.5S4.01 2 6.5 2 11 4.01 11 6.5 8.99 11 6.5 11z" fill="currentColor" fillRule="evenodd"></path>
                                    </svg>
                                </div>
                                <div  className={styles.searchAutoComplete}>
                                    <div className={styles.searchAutoCompleteLine}>
                                        <label className={styles.searchAutoCompleteInput}>
                                            <input className={styles.searchAutoCompleteInputElement} placeholder="Search" defaultValue="" />
                                    
                                        </label>
                                    </div>
                                </div>
                                <Button type="button" className={styles.btn}>
                                    <svg width="15" height="9" viewBox="0 0 15 9" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.708 0L7.2 5.496 1.692 0 0 1.692l7.2 7.2 7.2-7.2z" fill="currentColor" fillRule="evenodd"></path>
                                    </svg>
                                </Button>
                            </div>
                            <div className="slideDown"></div>
                        </div>
                    </div>}
                </div>
            </Container>
        </div>
    )
}

export default DashboardHeader