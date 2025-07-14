import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import MainListSorter from '../ListSorters/MainListSorter.jsx';
import PlatformerListSorter from '../ListSorters/PlatformerListSorter.jsx';
import SkeletonList from "../ListSorters/SkeletonList.jsx";

import './list-display.css';

function ListDisplay(props) {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    function handleDropdownSelect(list) {
        if (list === props.currentList) return;
        toggleDropdownMenu();
        
        props.onListChange(list);
    }

    function determineActiveStyle(list) {
        if (list === props.currentList) return "active-list"
    }

    function renderActiveList() {
        if (props.loading) return <SkeletonList />;

        if (props.currentList === "platformer" && props.platformerData) {
            return <PlatformerListSorter data={props.platformerData} />;
        }
        if (props.currentList === "classic" && props.mainListData) {
            return <MainListSorter data={props.mainListData} />;
        }

        return <SkeletonList />;
    }

    function createDropdownButton(list) {
        let text = list.charAt(0).toUpperCase() + list.slice(1) + " List";
        let className = "dropdown-item " + determineActiveStyle(list);
        let onClick = () => handleDropdownSelect(list);

        return (<button className={className} onClick={onClick}>{text}</button>);
    }

    function toggleDropdownMenu() {
        setDropdownVisible(!dropdownVisible)

        const dropdownMenu = document.querySelector(".dropdown-menu");
        dropdownMenu.style.top = dropdownVisible ? "-40px" : "40px";
    }

    return (
        <div className="list-bg">
            <button className="drop-btn" onClick={() => toggleDropdownMenu()}>
                <FontAwesomeIcon icon={faCaretDown} className={"dropdown-arrow " + (dropdownVisible ? "arrow-rotated" : "")} />
                Change List
            </button>


            <div className="dropdown-menu">
                {createDropdownButton("classic")}
                {createDropdownButton("platformer")}
            </div>
            {renderActiveList()}
        </div>
    )
}

export default ListDisplay;