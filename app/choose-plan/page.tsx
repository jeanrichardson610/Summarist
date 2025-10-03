"use client"
import React, { useState } from "react";
import pricing from "../assets/pricing-top.png";
import Image from "next/image";
import { IoDocumentTextSharp } from "react-icons/io5";
import { RiPlantFill } from "react-icons/ri";
import { FaHandshake } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import Footer from "../components/Footer";

const Upgrade = () => {

    const [isFaqOpen, setIsFaqOpen] = useState<number | null>(0)
    const [selectedPlan, setSelectedPlan] = useState<number>(0);

    const handleFaqClick = (index: number) => {
        setIsFaqOpen(isFaqOpen === index ? null : index)
    }

    const handlePlanClick = (index: number) => {
        setSelectedPlan(index)
    };

  return (
    <>
    <div id="__next">
      <div className="wrapper wrapper__full">
        <div className="plan">
          <div className="plan__header--wrapper">
            <div className="plan__header">
              <div className="plan__title">
                Get unlimited access to many amazing books to read
              </div>
              <div className="plan__subtitle">
                Turn ordinary moments into amazing learning opportunities
              </div>
              <figure className="plan__img--mask">
                <Image alt="pricing" src={pricing} loading="lazy" width={350} height={350} />
              </figure>
            </div>
          </div>
          <div className="row">
            <div className="container">
              <div className="plan__features--wrapper">
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <IoDocumentTextSharp />
                  </figure>
                  <div className="plan__features--text">
                    <b>Key ideas in a few minutes </b>
                    with many books to read
                  </div>
                </div>
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <RiPlantFill />
                  </figure>
                  <div className="plan__features--text">
                    <b>3 million </b>
                    people growing with Summarist everyday
                  </div>
                </div>
                <div className="plan__features">
                  <figure className="plan__features--icon">
                    <FaHandshake />
                  </figure>
                  <div className="plan__features--text">
                    <b>Precise recommendations </b>
                    collections curated by experts
                  </div>
                </div>
              </div>
              <div className="section__title">
                Choose the plan that fits you
              </div>
              <div className={`plan__card ${
                selectedPlan === 0 ? "plan__card--active" : ""
              }`}
              onClick={() => handlePlanClick(0)}
              >
                <div className="plan__card--circle">
                  {selectedPlan === 0 ? <div className="plan__card--dot"></div> : null}
                </div>
                <div className="plan__card--content">
                  <div className="plan__card--title">Premium Plus Yearly</div>
                  <div className="plan__card--price">$99.99/year</div>
                  <div className="plan__card--text">
                    7-day free trial included
                  </div>
                </div>
              </div>
              <div className="plan__card--seperator">
                <div className="plan__seperator">or</div>
              </div>
              <div className={`plan__card ${
                selectedPlan === 1 ? "plan__card--active" : ""
              }`}
              onClick={() => handlePlanClick(1)}
              >
                <div className="plan__card--circle">
                  {selectedPlan === 1 ? <div className="plan__card--dot"></div> : null}  
                </div>
                <div className="plan__card--content">
                  <div className="plan__card--title">Premium Monthly</div>
                  <div className="plan__card--price">$9.99/month</div>
                  <div className="plan__card--text">No trial included</div>
                </div>
              </div>
              <div className="plan__card--cta">
                <span className="btn--wrapper">
                    {selectedPlan === 0 ? 
                    <a href="https://buy.stripe.com/test_00g7uvdPF0qkfDi000" target="_blank">
                    <button className="btn cta-btn">
                    <span>Start your free 7-day free trial</span>
                    </button>
                    </a>
                    :
                    <a href="https://buy.stripe.com/test_28o5mn8vl4GA1Ms7st" target="_blank">
                    <button className="btn cta-btn">
                    <span>Start your first month</span>
                    </button>
                    </a>
                    }
                </span>
                {selectedPlan === 0 ? 
                <div className="plan__disclaimer">
                  Cancel your trial at any time before it ends, and you won't
                  get charged.
                </div>
                :
                <div className="plan__disclaimer">30-day money back guarantee, no questions asked.</div>
            }
                
              </div>
              <div className="faq__wrapper">
                <div onClick={() => handleFaqClick(0)} className="accordion__card">
                  <div className="accordion__header">
                    <div className="accordion__title">
                      How does the free 7-day trial work?
                    </div>
                    <IoIosArrowUp className={`accordion__icon ${
                        isFaqOpen === 0 ? "accordion__icon--rotate" : ""
                    }`} />
                  </div>
                  <div className={isFaqOpen === 0 ? "show" : "collapse"}>
                    <div className="accordion__body">
                      Begin your complimentary 7-day trial with a Summarist
                      annual membership. You are under no obligation to continue
                      your subscription, and you will only be billed when the
                      trial period expires. With Premium access, you can learn
                      at your own pace and as frequently as you desire, and you
                      may terminate your subscription prior to the conclusion of
                      the 7-day free trial.
                    </div>
                  </div>
                </div>

                <div onClick={() => handleFaqClick(1)} className="accordion__card">
                  <div className="accordion__header">
                    <div className="accordion__title">
                      Can I switch subscriptions from monthly to yearly, or
                      yearly to monthly?
                    </div>
                    <IoIosArrowUp className={`accordion__icon ${
                        isFaqOpen === 1 ? "accordion__icon--rotate" : ""
                    }`} />
                  </div>
                  <div className={isFaqOpen === 1 ? "show" : "collapse"}>
                    <div onClick={() => handleFaqClick(1)} className="accordion__body">
                      While an annual plan is active, it is not feasible to
                      switch to a monthly plan. However, once the current month
                      ends, transitioning from a monthly plan to an annual plan
                      is an option.
                    </div>
                  </div>
                </div>
                <div onClick={() => handleFaqClick(2)} className="accordion__card">
                  <div className="accordion__header">
                    <div className="accordion__title">
                      What's included in the Premium plan?
                    </div>
                    <IoIosArrowUp className={`accordion__icon ${
                        isFaqOpen === 2 ? "accordion__icon--rotate" : ""
                    }`} />
                  </div>

                  <div className={isFaqOpen === 2 ? "show" : "collapse"}>
                    <div onClick={() => handleFaqClick(2)} className="accordion__body">
                      Premium membership provides you with the ultimate
                      Summarist experience, including unrestricted entry to many
                      best-selling books high-quality audio, the ability to
                      download titles for offline reading, and the option to
                      send your reads to your Kindle.
                    </div>
                  </div>
                </div>
                <div onClick={() => handleFaqClick(3)} className="accordion__card">
                  <div className="accordion__header">
                    <div className="accordion__title">
                      Can I cancel during my trial or subscription?
                    </div>
                    <IoIosArrowUp className={`accordion__icon ${
                        isFaqOpen === 3 ? "accordion__icon--rotate" : ""
                    }`} />
                  </div>
                  <div className={isFaqOpen === 3 ? "show" : "collapse"}>
                    <div onClick={() => handleFaqClick(3)} className="accordion__body">
                      You will not be charged if you cancel your trial before
                      its conclusion. While you will not have complete access to
                      the entire Summarist library, you can still expand your
                      knowledge with one curated book per day.{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Upgrade;
