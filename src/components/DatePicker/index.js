import React from "react";
import PropTypes from "prop-types";
import "./style/picker.css";
import "./style/theme.css";
import Slider from "react-slick";
import moment from "moment";
import nextArrowImg from "./img/next.png";
import backArrowImg from "./img/back.png";

const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let yearsUpdated = false;
let oldyear = null;
let actualYear = null;
let monthIndex = null;
let weekIndex = 502;
let years = null;
let weekDays = null;
let daysBeforeAndAfter = 500;
const DatePicker = ({ value, disabledDays, disabled, onChange, activeSlotBackground }) => {
  let yearRef = null;
  let monthRef = null;
  let weekRef = null;
  let year = moment(value).year();
  if (!yearsUpdated) {
    oldyear = year;
    monthIndex = moment(value).month();
    years = renderYears(oldyear);
    actualYear = years.length / 2;
    
  }
  weekDays = getDates(value);
  let yearIndex = years.length / 2;

  const monthssettings = {
    slidesToShow: 1,
    initialSlide: monthIndex,
    arrows: false,
    draggable:false,
    afterChange: index => {
      monthIndex = index;
      onChange(
        new Date(
          `${weekDays[weekIndex].format("DD")} ${months[index]} ${
            years[actualYear]
          }`
        )
      );
    }
  };
  var yearsettings = {
    slidesToShow: 1,
    initialSlide: yearIndex,
    arrows: false,
    draggable:false,
    afterChange: index => {
      actualYear = index;
      onChange(
        new Date(
          `${weekDays[weekIndex].format("DD")} ${months[monthIndex]} ${
            years[actualYear]
          }`
        )
      );
    }
  };

  var weeksettings = {
    slidesToShow: 7,
    arrows: false,
    draggable:false,
    afterChange: index => {
      daysBeforeAndAfter = index + 3;
    }
  };
  return (
    <div
      className="main_div"
      style={{ flex: 1, textAlign: "center", backgroundColor: "#f4f4f4" }}
    >
      <div className="main_year" style={{}}>
        <button onClick={() => yearRef.slickPrev()} disabled={disabled}>
          <img src={backArrowImg} alt="back_img" />
        </button>
        <Slider ref={yearSlider => (yearRef = yearSlider)} {...yearsettings}>
          {years.map(year => (
            <div key={year}>
              <h3>{year}</h3>
            </div>
          ))}
        </Slider>
        <button onClick={() => yearRef.slickNext()} disabled={disabled}>
          <img src={nextArrowImg} alt="next_img" />
        </button>
      </div>
      <div className="main_month" style={{}}>
        <button onClick={() => monthRef.slickPrev()} disabled={disabled}>
          <img src={backArrowImg} alt="back_img" />
        </button>
        <Slider
          {...monthssettings}
          ref={monthSlider => (monthRef = monthSlider)}
        >
          {months.map(month => (
            <div key={month}>
              <h3>{month}</h3>
            </div>
          ))}
        </Slider>
        <button onClick={() => monthRef.slickNext()} disabled={disabled}>
          <img src={nextArrowImg} alt="next_img" />
        </button>
      </div>
      <div className="clearfix" />
      <div className="main_day" style={{}}>
        <button className="back" onClick={() => weekRef.slickPrev()} disabled={disabled}>
          <img src={backArrowImg} alt="back_img" />
        </button>
        <Slider
          {...weeksettings}
          ref={weekSlider => {
            let ind = weekDays.findIndex((day)=>moment(day).format("D-M-Y") === moment(value).format("D-M-Y"))         
            weekRef = weekSlider;
            if (!yearsUpdated) {
              weekSlider.slickGoTo(ind - 3, true);
              weekIndex = ind;
              yearsUpdated = true;
            }
          }}
        >
          {weekDays.map((day, index) => (
            <div key={day}>
            <button
              className={[isDateActive(day, value) && "active"]}
              style={{backgroundColor:isDateActive(day, value)?activeSlotBackground:'#fff',width:'100%'}}            
              disabled={disabled || checkDisabled(day, disabledDays)}
              onClick={() => {
                weekIndex = index;
                //weekRef.slickGoTo(index, true);
                onChange(
                  new Date(
                    `${weekDays[weekIndex].format("DD")} ${
                      months[monthIndex]
                    } ${years[actualYear]}`
                  )
                );
              }}
            >
              <h3>{day.format("DD")}</h3>
              <h3> {day.format("ddd").toUpperCase()}</h3>
            </button>
            </div>
          ))}
        </Slider>
        <button className="next" onClick={() => weekRef.slickNext()} disabled={disabled}>
          <img src={nextArrowImg} alt="next_img" />
        </button>
      </div>
    </div>
  );
};

const checkDisabled = (day, disabledDays) =>
  disabledDays.some(
    disabled => moment(day).format("D-M-Y") === moment(disabled).format("D-M-Y")
  );

const isDateActive = (day, value) =>
  moment(day).format("D-M-Y") === moment(value).format("D-M-Y");

const renderYears = year => {
  const minYear = year - 100;
  const maxYear = year + 99;

  const options = [];
  for (let i = minYear; i <= maxYear; i++) {
    options.push(i);
  }
  return options;
};

const getDates = date => {
  const startDay = moment(date).subtract(daysBeforeAndAfter + 1, "days");

  const totalDaysCount = daysBeforeAndAfter + daysBeforeAndAfter + 1;
  // And return an array of `totalDaysCount` dates
  return [...Array(totalDaysCount)].map(_ => startDay.add(1, "day").clone());
};

DatePicker.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  disabledDays: PropTypes.array,
  disabled: PropTypes.bool,
  activeSlotBackground: PropTypes.string,
};

DatePicker.defaultProps = {
  value: new Date(),
  disabled: false,
  disabledDays: [],
  activeSlotBackground: '#6997ff'
};
export default DatePicker;
