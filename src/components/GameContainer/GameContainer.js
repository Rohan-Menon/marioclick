import React from "react";
import ImageContainer from "../ImageContainer";
import "./GameContainer.css";

class GameContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: 0,
            topscore: 0,
            info: "Don't click on a mario character more than once!",
            alreadyClicked: [],
            images: [
                "images/mario0.jpg",
                "images/mario1.jpg",
                "images/mario2.jpg",
                "images/mario3.jpg",
                "images/mario4.jpg",
                "images/mario5.jpg",
                "images/mario6.jpg",
                "images/mario7.jpg",
                "images/mario8.jpg",
                "images/mario9.jpg",
                "images/mario10.jpg",
                "images/mario11.jpg",
                "images/mario12.jpg",
                "images/mario13.jpg",
                "images/mario14.jpg",
                "images/mario15.jpg",
                "images/mario16.jpg",
                "images/mario17.jpg"],
            newGame: true
        };
    }



    imageClick = (clickedImg) => {


        console.log(this.state.newGame);

        if (this.state.newGame) {
            this.setState({
                score: 1,
                info: "+1, Keep Guessing!",
                alreadyClicked: [clickedImg],
                images: this.shuffleImages(this.state.images),
                newGame: false
            })
        }
        else {
            let alreadyClicked = this.state.alreadyClicked;
            let newImg = true;
            alreadyClicked.forEach((arrImg) => {
                if (arrImg === clickedImg) {
                    let topscore = this.state.topscore;
                    if(this.state.score > this.state.topscore){
                        topscore = this.state.score;
                    }
                    this.setState({
                        score: 0,
                        topscore: topscore,
                        info: "Mama Mia! You already clicked that one. Try again?",
                        alreadyClicked: [],
                        images: this.shuffleImages(this.state.images),
                        newGame: true
                    })
                    newImg = false;
                }
            })

            if (newImg) {
                if (this.state.alreadyClicked.length === (this.state.images.length - 1)) {
                    let topscore = this.state.topscore +1;
                    this.setState({
                        score: 0,
                        topscore: topscore,
                        info: "You WIN!!!!",
                        alreadyClicked: [],
                        images: this.shuffleImages(this.state.images),
                        newGame: true
                    })
                }
                else {
                    let tempArr = this.state.alreadyClicked;
                    tempArr.push(clickedImg);
                    this.setState({
                        score: this.state.score + 1,
                        info: "+1, Keep Guessing!",
                        alreadyClicked: tempArr,
                        images: this.shuffleImages(this.state.images),
                        newGame: false
                    })
                }


            }



        }

    }


    shuffleImages = (imgArray) => {


        let currentIndex = imgArray.length;
        let temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = imgArray[currentIndex];
            imgArray[currentIndex] = imgArray[randomIndex];
            imgArray[randomIndex] = temporaryValue;
        }

        return imgArray;
    }

    render() {
        return (
            <div className="gameContainer">
            <div></div>
                <h4 className="info"> {this.state.info}</h4>
                <h4 className="score"> Score: {this.state.score} </h4>
                <h4 className="topscore">Top Score: {this.state.topscore}</h4>
                <br />
                <div className="image-grid">
                    {
                        this.state.images.map(img => {
                            return (<div key={img}>
                                <ImageContainer imgsrc={img} onClick={() => this.imageClick(img)} />
                            </div>);
                        })
                    }
                </div>
            </div>
        );
    }

}

export default GameContainer;