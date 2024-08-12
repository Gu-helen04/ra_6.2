export default function RenderNote(props) {
    const { apiURL, body,  handleClickRemove} = props

    return (
        <div className="note">
            <p className="note-text">
                {body.content}
            </p>
            <button className="note-close-btn" onClick={() => handleClickRemove(apiURL, body.id)}>
                &#10060;
            </button>
        </div>
    )
}