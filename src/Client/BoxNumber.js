import React from "react";
import "./BoxNumber.scss";

class BoxNumber extends React.Component {
  render() {
    return (
      <>
        {this.props.number !== 0 && (
          <div className="box-number">
            <p>{this.props.number}</p>
          </div>
        )}
      </>
    );
  }
}

export default BoxNumber;
