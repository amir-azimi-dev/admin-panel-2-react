import React, { useEffect, useState } from 'react'
import "./Users.scss"

// components
import EmptyContentNotif from "../EmptyContentNotif/EmptyContentNotif"
import DetailsModal from "../DetailsModal/DetailsModal"
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'

// services
import prettifyNumber from '../../../Services/Services'

// toastify
import { ToastContainer, toast } from 'react-toastify'

// icons
import { AiOutlineUser } from "react-icons/ai";

export default function Users() {
  const [allUsers, setAllUsers] = useState([])
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [activeUser, setActiveUser] = useState(null)
  // new user states
  const [newFirstNameValue, setNewFirstNameValue] = useState("")
  const [newLastNameValue, setNewLastNameValue] = useState("")
  const [newUsernameValue, setNewUsernameValue] = useState("")
  const [newPasswordValue, setNewPasswordValue] = useState("")
  const [newPhoneValue, setNewPhoneValue] = useState("")
  const [newCityValue, setNewCityValue] = useState("")
  const [newEmailValue, setNewEmailValue] = useState("")
  const [newAddressValue, setNewAddressValue] = useState("")
  const [newScoreValue, setNewScoreValue] = useState("")
  const [newBuyValue, setNewBuyValue] = useState("")

  const getAndSetAllUsers = () => {
    fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(users => setAllUsers(users))
  }

  useEffect(() => {
    getAndSetAllUsers()
  }, [])

  // details modal
  const showDetailsModal = user => {
    setActiveUser(user)
    setIsShowDetailsModal(true)
  }
  const closeDetailsModal = () => setIsShowDetailsModal(false)

  // delete modal
  const showDeleteModal = comment => {
    setActiveUser(comment)
    setIsShowDeleteModal(true)
  }
  const closeDeleteModal = () => {
    setIsShowDeleteModal(false)
  }
  const deleteUser = id => {
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.affectedRows !== 1) {
          throw new Error()
        }
        toast.success("کاربر با موفقیت حذف شد.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        })
        setIsShowDeleteModal(false)
        getAndSetAllUsers()
      })
      .catch(() => toast.error("خطا در حذف کاربر.", { autoClose: 3000 }))
  }

  // edit modal 
  const showEditModal = user => {
    setActiveUser(user)

    setNewFirstNameValue(user.firsname)
    setNewLastNameValue(user.lastname)
    setNewUsernameValue(user.username)
    setNewPasswordValue(user.password)
    setNewPhoneValue(user.phone)
    setNewCityValue(user.city)
    setNewEmailValue(user.email)
    setNewAddressValue(user.address)
    setNewScoreValue(user.score)
    setNewBuyValue(user.buy)

    setIsShowEditModal(true)
  }
  const closeEditModal = () => {
    setIsShowEditModal(false)
  }
  const editUser = e => {
    e.preventDefault()

    const userNewData = {
      firsname: newFirstNameValue,
      lastname: newLastNameValue,
      username: newUsernameValue,
      password: newPasswordValue,
      phone: newPhoneValue,
      city: newCityValue,
      email: newEmailValue,
      address: newAddressValue,
      score: newScoreValue,
      buy: newBuyValue
    }

    fetch(`http://localhost:3000/api/users/${activeUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userNewData)
    }).then(res => res.json())
      .then(data => {
        if (data.affectedRows !== 1) {
          throw new Error()
        }
        toast.success("کاربر با موفقیت ,ویرایش شد.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        })
        getAndSetAllUsers()
        closeEditModal()
      })
      .catch(() => toast.error("خطا در ویرایش کاربر !!! هیچ یک از فیلدها نمی‌تواند خالی باشد، برای فیلد‌هایی که عددی هستند مقادیر عددی ارسال نکنید."))

    setIsShowEditModal(false)
  }

  return (
    <div>
      <h1 className="cms-title">لیست کاربران</h1>
      <div>
        {allUsers.length ? (
          <div className="cms-table__container">
            <table className='cms-table'>
              <thead>
                <tr>
                  <th>نام</th>
                  <th>نام کاربری</th>
                  <th>رمز عبور</th>
                  <th>شماره تماس</th>
                  <th>ایمیل</th>
                  <th>عملیات</th>
                </tr>
              </thead>

              <tbody>
                {allUsers.map(user => (
                  <tr key={user.id}>
                    <td>{`${user.firsname} ${user.lastname}`}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className="cms-table__btn" onClick={() => showDetailsModal(user)}>جزئیات</button>
                      <button className="cms-table__btn" onClick={() => showEditModal(user)}>ویرایش</button>
                      <button className="cms-table__btn" onClick={() => showDeleteModal(user)}>حذف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <EmptyContentNotif message="هیچ کاربری یافت نشد !!!" />}




        {isShowDetailsModal && <DetailsModal hideModal={closeDetailsModal}>
          <table className='cms-table'>
            <thead>
              <tr>
                <th>نام</th>
                <th>نام کاربری</th>
                <th>استان</th>
                <th>آدرس</th>
                <th>امتیاز</th>
                <th>میزان خرید</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{`${activeUser.firsname} ${activeUser.lastname}`}</td>
                <td>{activeUser.username}</td>
                <td>{activeUser.city}</td>
                <td>{activeUser.address}</td>
                <td>{prettifyNumber(activeUser.score)}</td>
                <td>{prettifyNumber(activeUser.buy)}</td>
              </tr>
            </tbody>
          </table>
        </DetailsModal>}

        {isShowDeleteModal && <DeleteModal title="آیا از حذف مطمئن هستید؟" activeItem={activeUser} cancelAction={closeDeleteModal} confirmAction={deleteUser} />}

        {isShowEditModal && (
          <EditModal hideModal={closeEditModal} submitChanges={editUser}>
            <div className="edit-user">
              <div className="edit-user__form-group">
                <AiOutlineUser />
                <input type="text" placeholder='نام جدید کاربر را وارد کنید' className='edit-user__input' value={newFirstNameValue} onChange={e => setNewFirstNameValue(e.target.value)} />
              </div>

              <div className="edit-user__form-group">
                <AiOutlineUser />
                <input type="text" placeholder='نام خانوادگی جدید را وارد کنید' className='edit-user__input' value={newLastNameValue} onChange={e => setNewLastNameValue(e.target.value)} />
              </div>

              <div className="edit-user__form-group">
                <AiOutlineUser />
                <input type="text" placeholder='نام کاربری جدید را وارد کنید' className='edit-user__input' value={newUsernameValue} onChange={e => setNewUsernameValue(e.target.value)} />
              </div>

              <div className="edit-user__form-group">
                <AiOutlineUser />
                <input type="text" placeholder='رمز عبور جدید را وارد کنید' className='edit-user__input' value={newPasswordValue} onChange={e => setNewPasswordValue(e.target.value)} />
              </div>

              <div className="edit-user__form-group">
                <AiOutlineUser />
                <input type="text" placeholder='شماره تماس جدید را وارد کنید' className='edit-user__input' value={newPhoneValue} onChange={e => setNewPhoneValue(e.target.value)} />
              </div>

              <div className="edit-user__form-group">
                <AiOutlineUser />
                <input type="text" placeholder='استان جدید را وارد کنید' className='edit-user__input' value={newCityValue} onChange={e => setNewCityValue(e.target.value)} />
              </div>

              <div className="edit-user__form-group">
                {/* <AiOutlineUser /> */}
                <textarea placeholder='آدرس جدید را وارد کنید' className='edit-user__input' value={newAddressValue} onChange={e => setNewAddressValue(e.target.value)} ></textarea>
              </div>

              <div className="edit-user__form-group">
                <AiOutlineUser />
                <input type="text" placeholder='ایمیل جدید را وارد کنید' className='edit-user__input' value={newEmailValue} onChange={e => setNewEmailValue(e.target.value)} />
              </div>

              <div className="edit-user__form-group">
                <AiOutlineUser />
                <input type="number" placeholder='امتیاز جدید را وارد کنید' className='edit-user__input' value={newScoreValue} onChange={e => setNewScoreValue(e.target.value)} />
              </div>

              <div className="edit-user__form-group">
                <AiOutlineUser />
                <input type="number" placeholder='میزان خرید جدید را وارد کنید' className='edit-user__input' value={newBuyValue} onChange={e => setNewBuyValue(e.target.value)} />
              </div>
            </div>
          </EditModal>
        )}

        <ToastContainer rtl />
      </div>
    </div>
  )
}
