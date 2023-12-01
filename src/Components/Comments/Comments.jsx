import React, { useEffect, useState } from 'react'

// components
import EmptyContentNotif from "../EmptyContentNotif/EmptyContentNotif"
import DetailsModal from "../DetailsModal/DetailsModal"
import DeleteModal from '../DeleteModal/DeleteModal'
import EditModal from '../EditModal/EditModal'

// toastify
import { ToastContainer, toast } from 'react-toastify'

export default function Comments() {
  const [allComments, setAllComments] = useState([])
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false)
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false)
  const [activeComment, setActiveComment] = useState(null)
  const [activeCommentBody, setActiveCommentBody] = useState("")

  const getAndSetAllComments = () => {
    fetch("http://localhost:3000/api/comments")
      .then(res => res.json())
      .then(data => setAllComments(data))
  }

  useEffect(() => {
    getAndSetAllComments()
  }, [])

  // details modal
  const showDetailsModal = comment => {
    setActiveComment(comment)
    setIsShowDetailsModal(true)
  }
  const onCloseDetailsModal = () => {
    setIsShowDetailsModal(false)
  }

  // delete modal
  const showDeleteModal = comment => {
    setActiveComment(comment)
    setIsShowDeleteModal(true)
  }
  const onCloseDeleteModal = () => {
    setIsShowDeleteModal(false)
  }
  const onSubmitDeletion = id => {
    fetch(`http://localhost:3000/api/comments/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(data => {
        if (data.affectedRows !== 1) {
          throw new Error()
        }
        toast.success("کامنت با موفقیت حذف شد.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        })
        setIsShowDeleteModal(false)
        getAndSetAllComments()
      })
      .catch(() => toast.error("خطا در حذف کامنت.", { autoClose: 3000 }))
  }

  // edit modal
  const showEditModal = comment => {
    setIsShowEditModal(true)
    setActiveComment(comment)
    setActiveCommentBody(comment.body)
  }
  const onCloseEditModal = () => {
    setIsShowEditModal(false)
  }
  const onUpdateComment = event => {
    event.preventDefault()

    if (!activeCommentBody.trim()) {
      return toast.error("متن کامنت نمی‌تواند خالی باشد.")
    }
    fetch(`http://localhost:3000/api/comments/${activeComment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ body: activeCommentBody })
    })
      .then(res => res.json())
      .then(data => {
        if (data.affectedRows !== 1) {
          throw new Error()
        }
        setIsShowEditModal(false)
        toast.success("کامنت با موفقیت اصلاح شد.", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        })
        getAndSetAllComments()
      })
      .catch(() => toast.error("خطا در ویرایش کامنت.", { autoClose: 3000 }))
  }

  // accept modal
  const showAcceptModal = comment => {
    setActiveComment(comment)
    setIsShowAcceptModal(true)
  }
  const confirmAcceptOrRejectModal = id => {
    const willAccept = !activeComment.isAccept
    const subURL = willAccept ? "accept" : "reject"
    const action = willAccept ? "تایید" : "رد"

    fetch(`http://localhost:3000/api/comments/${subURL}/${id}`, {
      method: "POST",
    }).then(res => res.json())
      .then(data => {
        if (!data.affectedRows === 1) {
          throw new Error()
        }
        toast.success(`کامنت با موفقیت ${action} شد.`, { autoClose: 3000 , position: toast.POSITION.BOTTOM_RIGHT})
        getAndSetAllComments()
        setIsShowAcceptModal(false)
      })
      .catch(() => toast.error(`خطا در ${action} کامنت!!!`, { autoClose: 3000 }))
  }
  const closeAcceptModal = () => {
    setIsShowAcceptModal(false)
  }

  return (
    <div>
      {allComments.length ? (
        <div className="cms-table__container">
          <table className='cms-table'>
            <thead>
              <tr>
                <th>نام کاربر</th>
                <th>محصول</th>
                <th>کامنت</th>
                <th>تاریخ</th>
                <th>ساعت</th>
                <th>عملیات</th>
              </tr>
            </thead>

            <tbody>
              {allComments.map(comment => (
                <tr key={comment.id}>
                  <td>{comment.userID}</td>
                  <td>{comment.productID}</td>
                  <td>
                    <button className='cms-table__btn' onClick={() => showDetailsModal(comment)}>مشاهده</button>
                  </td>
                  <td>{comment.date}</td>
                  <td>{comment.hour}</td>
                  <td>
                    <button className="cms-table__btn" onClick={() => showAcceptModal(comment)}>{comment.isAccept ? "رد" : "تایید"}</button>
                    <button className="cms-table__btn">پاسخ</button>
                    <button className="cms-table__btn" onClick={() => showEditModal(comment)}>ویرایش</button>
                    <button className="cms-table__btn" onClick={() => showDeleteModal(comment)}>حذف</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : <EmptyContentNotif message="هیچ نظری وجود ندارد !!!" />}

      {isShowDetailsModal && (
        <DetailsModal hideModal={onCloseDetailsModal}>
          <h3>متن پیام</h3>
          <hr />
          <p className='my-5'>{activeComment?.body}</p>
        </DetailsModal>
      )}
      {isShowDeleteModal && <DeleteModal title="آیا از حذف مطمئن هستید؟" activeItem={activeComment} cancelAction={onCloseDeleteModal} confirmAction={onSubmitDeletion} />}
      {isShowEditModal && (
        <EditModal hideModal={onCloseEditModal} submitChanges={onUpdateComment}>
          <textarea className='edit-comment__textarea my-5' value={activeCommentBody} onChange={e => setActiveCommentBody(e.target.value)}></textarea>
        </EditModal>
      )}
      {isShowAcceptModal && <DeleteModal title={`کامنت ${activeComment.isAccept ? "رد" : "تایید"} شود؟`} doNotShowDeletionDescription={true} confirmAction={confirmAcceptOrRejectModal} cancelAction={closeAcceptModal} activeItem={activeComment} />}

      <ToastContainer rtl />
    </div>
  )
}
