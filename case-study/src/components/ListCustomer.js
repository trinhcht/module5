import React, {useEffect, useState} from "react";
import {Header} from "./Header";
import {Footer} from "./Footer";
import dbData from "../db.json"
import {Link, useNavigate} from "react-router-dom";
import {findAllCustomer, getCustomerType, remove} from "../service/CustomerService";
import data from "bootstrap/js/src/dom/data";

export const ListCustomer = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(dbData.customerList)
    const [customerTypes, setCustomerTypes] = useState([])
    const [idDelete, setIdDelete] = useState(null)
    const [nameDelete, setNameDelete] = useState(null)

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [customerList, setCustomerList] = useState([]);

    const getListCustomer = async () => {
        const listCustomer = await findAllCustomer();
        setCustomer(listCustomer);
    }

    const onDelete = async (id) => {
        const res = await remove(id);
        if (res.code === 200) {
            await getListCustomer();
        }
    }

    const getInfoDelete = (id, name) => {
        setIdDelete(id)
        setNameDelete(name)
    }

    useEffect(() => {
        getListCustomer();
        const fetchCustomerTypes = async () => {
            const data = await getCustomerType();
            setCustomerTypes(data);
        }
        fetchCustomerTypes()
    }, [])

    const totalPages = Math.ceil(dbData.customerList.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCustomers = dbData.customerList.slice(startIndex, endIndex);

    return (
        <>
            <>
                <Header/>
            </>
            <>
                <>
                    <div className="row mx-0" style={{marginTop: 96}}>
                        <img
                            className="img-fluid px-0"
                            style={{height: 400}}
                            src="https://blog.topcv.vn/wp-content/uploads/2017/11/ks.jpg"
                            alt=""
                        />
                        <h2 className="text-center pt-4" style={{
                            fontFamily: '"Playfair Display"',
                            position: "absolute",
                            margin: "inherit",
                            fontSize: 40,
                            color: "#0000ff",
                            textAlign: "center",
                            fontWeight: 700,
                            fontStyle: "normal"
                        }}>
                            DANH SÁCH KHÁCH HÀNG
                        </h2>
                    </div>
                    <div><h2></h2></div>
                    {/*thêm mới*/}
                    <div>
                        <Link to={`/customer/create`}>
                            <button
                                type="button"
                                className="btn btn-success"
                                style={{
                                    marginBottom: "2%",
                                    marginLeft: "8%",
                                    backgroundColor: "#a5eee6"
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    color="black"
                                    className="bi bi-cart4"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"/>
                                </svg>
                                <a href="#" style={{textDecoration: "none", color: "#1d1d1d"}}>
                                    <i className="bi bi-cart4"> Thêm khách hàng mới</i>
                                </a>
                            </button>
                        </Link>
                    </div>
                    <div className="row mx-0 mt-3 px-8 py-1">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>STT</th>
                                <th>Họ và tên</th>
                                <th>Ngày sinh</th>
                                <th>Giới tính</th>
                                <th>Số CMND</th>
                                <th>Số điện thoại</th>
                                <th>Email</th>
                                <th>Loại khách</th>
                                <th>Địa chỉ</th>
                                <th>Chức năng</th>
                            </tr>
                            </thead>
                            <tbody>
                            {currentCustomers.map((customer, index) => (
                                <tr>

                                    <td scope="row">{index+1}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.dateOfBirth}</td>
                                    <td>{customer.gender}</td>
                                    <td>{customer.citizenIdentification}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.email}</td>
                                    <td>{dbData.customerType.find(
                                        (customerType) => customerType.id === customer.customerType)?.nameType
                                    }

                                    </td>
                                    <td>{customer.address}</td>
                                    <td>
                                        {/*button edit, delete*/}
                                        <Link to={`/customer/update/${customer.id}`} style={{marginRight: "1rem"}}>
                                            <button
                                                type="button"
                                                className="btn btn-primary"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width={16}
                                                    height={16}
                                                    fill="currentColor"
                                                    className="bi bi-trash"
                                                    viewBox="0 0 16 16"
                                                >
                                                    <path
                                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                                    />
                                                </svg>
                                            </button>

                                        </Link>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={() => getInfoDelete(customer.id, customer.name)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width={16}
                                                height={16}
                                                fill="currentColor"
                                                className="bi bi-trash"
                                                viewBox="0 0 16 16"
                                            >
                                                <path
                                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                <path
                                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                            </svg>
                                        </button>
                                        {/* Modal xóa */}
                                        <div
                                            className="modal fade"
                                            id="exampleModal"
                                            tabIndex={-1}
                                            aria-labelledby="exampleModalLabel"
                                            aria-hidden="true"
                                        >
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalLabel">
                                                            Xóa khách hàng
                                                        </h5>
                                                        <button
                                                            type="button"
                                                            className="btn-close"
                                                            data-bs-dismiss="modal"
                                                            aria-label="Close"
                                                        />
                                                    </div>
                                                    <div className="modal-body">
                                                        <div>Bạn có muốn xóa <h5
                                                            className={"text-danger"}>{nameDelete} ?</h5></div>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button
                                                            type="button"
                                                            className="btn btn-secondary"
                                                            data-bs-dismiss="modal"
                                                        >
                                                            Đóng
                                                        </button>
                                                        <button type="button" data-bs-dismiss="modal"
                                                                className="btn btn-danger"
                                                                onClick={() => onDelete(idDelete)}>
                                                            Xóa
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    {/*Phân trang*/}
                    <nav
                        className="d-flex justify-content-center"
                        aria-label="Page navigation example"
                    >
                        <div>
                            <ul className="pagination">
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        style={{
                                            border: "none",
                                            backgroundColor: "#daeae9",
                                            color: "#1d1d1c"
                                        }}
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        Trước
                                    </button>
                                </li>
                                <li className="page-item" style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            className={`page-link ${currentPage === i + 1 ? 'active' : ''}`}
                                            onClick={() => handlePageChange(i + 1)}
                                            style={{
                                                border: "none",
                                                backgroundColor: "#daeae9",
                                                color: "#1d1d1c"
                                            }}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </li>
                                <li className="page-item">
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className="page-link"
                                        href="#"
                                        style={{
                                            border: "none",
                                            backgroundColor: "#daeae9",
                                            color: "#1d1d1c"
                                        }}
                                    >
                                        Sau
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </>

            </>
            <>
                <Footer/>
            </>
        </>


    )

}