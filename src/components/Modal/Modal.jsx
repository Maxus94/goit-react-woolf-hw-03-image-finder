import css from './Modal.module.css';

export const Modal =({children, toggleModal})=>{
    return(        
        <div className={css.overlay} onClick={toggleModal}><div className={css.modal}>{children}</div></div>
    )
}