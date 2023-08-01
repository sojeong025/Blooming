import { NavLink } from "react-router-dom"

export default function DiaryItem({ title, content, date, image }) {

  const styleBackImage = { backgroundImage: `url("${ image }")`, width: '200px', height: '300px'}


  return (
    <li className="cd-item" style={styleBackImage}>
      <NavLink to={"/"}>
        <div>
          <h2>{title}</h2>
          <p>{content}</p>
          <b>view More</b>
        </div>
      </NavLink>
    </li>
  );
}

