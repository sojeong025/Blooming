function PreviewModal({children, onClose}) {
  return(
    <div>
      <div onClick={onClose} />
      <dialog open >{children}</dialog>
    </div>
  )
}

export default PreviewModal;