import React from "react";
import {Header} from "./Header";
import {Footer} from "./Footer";
import '../index.css'
import {useNavigate} from "react-router-dom";
import {Formik} from "formik";
import * as FacilityService from "../service/FacilityService";


export function CreateFacility() {
    const navigate = useNavigate();
    return (
        <Formik
            initiaValues ={{
            img: "",
            facilitiesType: "",
            name: "",
            area: "",
            price: "",
            people: "",
            rentType: "",
            serviceFree: "",
        }}
        onSubmit={(values) =>{
            const create = async ()=>{
                await FacilityService.save(values)
                navigate('/')
            }
            create();
        }}
        >
            <>
                <>
                    <Header/>
                </>
                <>
                    <div
                        className="row mx-0"
                        style={{marginTop: 96, backgroundColor: "rgb(232, 235, 219)"}}
                    >
                        <div className="col-7">
                            <div>
                                <h2 className="text-center mt-3" style={{marginTop: "7%"}}>
                                    Thêm phòng mới
                                </h2>
                            </div>
                            <div className="dropdown text-center mt-3" style={{paddingRight: 360}}>
                                <div className="dropdown text-center mt-3" style={{paddingRight: 360}}>
                                    <select id='facilitiesType' className="form-select mt-3" aria-label="Danh sách cơ sở"
                                            style={{marginLeft: "20rem", width: "11rem"}}
                                    >
                                        <option value="0">Danh sách cơ sở</option>
                                        <option value="1">Phòng</option>
                                        <option value="2">Căn hộ</option>
                                        <option value="3">Biệt thự</option>
                                    </select>
                                </div>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Phòng
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Biệt thự
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="#">
                                            Căn hộ
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <form action="">
                                    <table className="" style={{width: 500}}>
                                        <tbody>
                                        <tr style={{height: 60}}>
                                            <th>
                                                <label className="fs-5" htmlFor="">
                                                    Tên dịch vụ:{" "}
                                                </label>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    name=""
                                                    placeholder="Nhập tên dịch vụ"
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{height: 60}}>
                                            <th>
                                                <label className="fs-5" htmlFor="">
                                                    Diện tích sử dụng:{" "}
                                                </label>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name=""
                                                    placeholder="Nhập diện tích sử dụng"
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{height: 60}}>
                                            <th>
                                                <label className="fs-5" htmlFor="">
                                                    Chi phí thuê:{" "}
                                                </label>
                                            </th>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name=""
                                                    placeholder="Nhập chi phí thuê"
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{height: 60}}>
                                            <th>
                                                <label className="fs-5" htmlFor="">
                                                    Số lượng người tối đa:{" "}
                                                </label>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name=""
                                                    placeholder="Nhập số lượng người tối đa"
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{height: 60}}>
                                            <th>
                                                <label className="fs-5" htmlFor="">
                                                    Kiểu thuê:{" "}
                                                </label>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    name=""
                                                    placeholder="Nhập kiểu thuê"
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{height: 60}}>
                                            <th>
                                                <label className="fs-5" htmlFor="">
                                                    Dịch vụ miễn phí đi kèm:{" "}
                                                </label>
                                            </th>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control "
                                                    name=""
                                                    placeholder="Nhập dịch vụ miễn phí đi kèm"
                                                />
                                            </td>
                                        </tr>
                                        <tr style={{height: 120}}>
                                            <td>
                                                <button className="btn btn-primary float-end">Xác nhận</button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </form>
                            </div>
                        </div>
                        <div className="col-5 p-0">
                            <img
                                className="w-100 h-100"
                                src="https://khunghiduong.vn/wp-content/uploads/2017/07/can-ho-1-phong-ngu-ariyana_2.jpg"
                                alt=""
                            />
                        </div>
                    </div>

                </>
                <>
                    <Footer/>
                </>
            </>
        </Formik>
    )
}