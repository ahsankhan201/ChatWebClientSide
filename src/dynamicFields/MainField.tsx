import React from "react";

interface Props {
  dynamic: Field[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  title:string
}

interface Field {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  className?:string
}

const MainField = ({ dynamic, onChange, onSubmit,title }: Props) => {
  return (
    <div >
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        {dynamic.map((item, index) => {
          return (
            <div key={index} style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                margin: "10px",
            }}>
              <label className={item.className}>{item.label}</label>
              <input
                type={item.type}
                name={item.name}
                placeholder={item.placeholder}
                required={item.required}
                onChange={onChange}
                className={item.className}
              />
            </div>
          );
        })}
        <button type="submit" style={{
           textAlign: "center",
            alignItems: "center",
            margin: "10px",
        }}>Submit</button>
      </form>
    </div>
  );
};

export default MainField;
