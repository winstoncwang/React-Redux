import React from 'react';
import { connect } from 'react-redux';

const SongDetail = (props) => {
	if (!props.song) {
		return <div>Please select a random song</div>;
	}

	return (
		<div>
			<h1>Title: {props.song.title}</h1>
			<div className="content">Duration: {props.song.duration}</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { song: state.selectedSong };
};

export default connect(mapStateToProps)(SongDetail);
