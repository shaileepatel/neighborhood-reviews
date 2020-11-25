import React from 'react';
import axios from 'axios';
import Carousel from './Carousel';
// import PropTypes from 'prop-types';
import styles from '../styles/Reviews.css';

class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: this.props.reviews,
      button: 'all',
    };
    this.handleReviewsClick = this.handleReviewsClick.bind(this);
    this.handleButtonOnHover = this.handleButtonOnHover.bind(this);
    this.handleButtonOffHover = this.handleButtonOffHover.bind(this);
  }

  componentDidUpdate(lastProps) {
    if (lastProps.reviews.length === 0 && this.props.reviews.length !== 0) {
      this.setState({
        reviews: this.props.reviews,
      });
    }
  }

  handleReviewsClick(e) {
    var allButtons = document.querySelectorAll(`.${styles.reviewsbtn}`);
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].style.background = 'rgb(245, 246, 247)';
    }
    e.target.style.background = "white";
    this.setState({
      button: e.target.innerHTML.toLowerCase(),
    });
    let selectedCategory = e.target.innerHTML.toLowerCase();
    if (selectedCategory === 'dog owners') {
      selectedCategory = 'dog_owner';
    } else if (selectedCategory === 'parents') {
      selectedCategory = 'parent';
    }

    axios({
      method: 'get',
      url: `${window.location}neighborhood_reviews`,
      params: {
        category: selectedCategory,
      },
    })
      .then((result) => {
        this.setState({
          reviews: result.data,
        });
      });
  }

  handleButtonOnHover(e) {
    if (e.target.innerHTML.toLowerCase() !== this.state.button) {
      e.target.style.background = 'rgb(222, 224, 227)';
    }
  }

  handleButtonOffHover(e) {
    if (e.target.innerHTML.toLowerCase() !== this.state.button) {
      e.target.style.background = 'rgb(245, 246, 247)';
    }
  }

  render() {
    return (
      <div className={styles.reviews}>
        <div className={styles.reviewsBar}>
          <span><button id="all" type="button" className={this.state.button === 'all' ? `${styles.reviewsbtn} ${styles.selectedBtn}` : styles.reviewsbtn} onClick={this.handleReviewsClick} onMouseEnter={this.handleButtonOnHover} onMouseLeave={this.handleButtonOffHover}>All</button></span>
          <span><button type="button" className={this.state.button === 'community' ? `${styles.reviewsbtn} ${styles.selectedBtn}` : styles.reviewsbtn} onClick={this.handleReviewsClick} onMouseEnter={this.handleButtonOnHover} onMouseLeave={this.handleButtonOffHover}>Community</button></span>
          <span><button type="button" className={this.state.button === 'dog owners' ? `${styles.reviewsbtn} ${styles.selectedBtn}` : styles.reviewsbtn} onClick={this.handleReviewsClick} onMouseEnter={this.handleButtonOnHover} onMouseLeave={this.handleButtonOffHover}>Dog Owners</button></span>
          <span><button type="button" className={this.state.button === 'parents' ? `${styles.reviewsbtn} ${styles.selectedBtn}` : styles.reviewsbtn} onClick={this.handleReviewsClick} onMouseEnter={this.handleButtonOnHover} onMouseLeave={this.handleButtonOffHover}>Parents</button></span>
          <span><button type="button" className={this.state.button === 'commute' ? `${styles.reviewsbtn} ${styles.selectedBtn}` : styles.reviewsbtn} onClick={this.handleReviewsClick} onMouseEnter={this.handleButtonOnHover} onMouseLeave={this.handleButtonOffHover}>Commute</button></span>
        </div>
        <div>
          <Carousel reviews={this.state.reviews} handleReviewModal={this.props.handleReviewModal} handleFlagToggle={this.props.handleFlagToggle} />
        </div>
      </div>
    );
  }
}

export default Reviews;
