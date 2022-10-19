import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

//STYLES
import "./freeSlider.css";
function FreeSlider({ children }, ref) {
    //CONSTS
    const slider = useRef(null);
    //LETS
    let holding = false;
    let firstClickX;
    let alreadyLeftScrolled;
    let velocity;
    let rafID;

    useImperativeHandle(ref, () => ({
        prev: () => {
            prev();
        },
        next: () => {
            next();
        },
    }));

    //FUNCTIONS
    function init() {
        // slider.current = document.querySelector(".slideshowContainer");

        slider.current.addEventListener("mousedown", (e) => {
            holding = true;
            firstClickX = e.pageX - slider.current.offsetLeft;
            alreadyLeftScrolled = slider.current.scrollLeft;

            stopTransition();
        });

        slider.current.addEventListener("mousemove", (e) => {
            if (!holding) return;

            const x = e.pageX - slider.current.offsetLeft;
            const scrolled = (x - firstClickX) * 1.2;
            const prevScrollLeft = slider.current.scrollLeft;

            slider.current.scrollLeft = alreadyLeftScrolled - scrolled;
            velocity = slider.current.scrollLeft - prevScrollLeft;
        });

        slider.current.addEventListener("mouseup", () => {
            holding = false;
            startTransition();
        });
        slider.current.addEventListener("mouseleave", () => {
            holding = false;
        });

        slider.current.addEventListener("touchstart", (e) => {
            holding = true;
            // pageX => la largeur entre mon click et le DOCUMENT
            firstClickX = e.targetTouches[0].pageX - slider.current.offsetLeft;

            alreadyLeftScrolled = slider.current.scrollLeft;
            stopTransition();
        });
        slider.current.addEventListener("touchend", () => {
            holding = false;
            startTransition();
        });
        slider.current.addEventListener("touchmove", (e) => {
            if (!holding) return;

            const x = e.targetTouches[0].pageX - slider.current.offsetLeft;
            const scrolled = (x - firstClickX) * 1.2;
            const prevScrollLeft = slider.current.scrollLeft;

            slider.current.scrollLeft = alreadyLeftScrolled - scrolled;
            velocity = slider.current.scrollLeft - prevScrollLeft;
        });
    }
    function startTransition() {
        stopTransition();
        window.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        rafID = requestAnimationFrame(decreasingTransition);
    }

    function stopTransition() {
        cancelAnimationFrame(rafID);
    }

    function decreasingTransition() {
        if (!!slider.current?.scrollLeft) {
            slider.current.scrollLeft += velocity;
            velocity *= 0.95;
            if (Math.abs(velocity) > 0.5) {
                rafID = requestAnimationFrame(decreasingTransition);
            }
        }
    }

    function prev() {
        slider.current.scrollLeft -= 10;
        velocity = -15;
        startTransition();
    }
    function next() {
        slider.current.scrollLeft += 10;
        velocity = 15;
        startTransition();
    }

    //EFFECTS
    useEffect(() => {
        init();
        //eslint-disable-next-line
    }, [children]);

    //RENDER
    return (
        <div className="freeSlider">
            <div ref={slider} className="slideshowContainer">
                <div className="slideshow">{children}</div>
            </div>
        </div>
    );
}

export default forwardRef(FreeSlider);
