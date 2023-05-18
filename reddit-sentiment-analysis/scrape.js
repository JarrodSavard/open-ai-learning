import snoowrap from 'snoowrap';
import { config } from 'dotenv';
config({
	path: '../.env',
});

const subReddits = ['investing', 'options', 'investing', 'stocks'];

const r = new snoowrap({
	userAgent: process.env.REDDIT_USER_AGENT,
	clientId: process.env.REDDIT_CLIENT_ID,
	clientSecret: process.env.REDDIT_CLIENT_SECRET,
	username: process.env.REDDIT_USERNAME,
	password: process.env.REDDIT_PASSWORD,
});

async function getSubredditTopComments(subreddit) {
	const comments = await r.getSubreddit(subreddit).getTop({ limit: 10 }); // Change the limit as per your requirement
	return comments.map((comment) => {
		return {
			subreddit: comment.subreddit_name_prefixed,
			title: comment.title,
			body: comment.selftext,
			score: comment.score,
			upvotes: comment.ups,
			ratio: comment.upvote_ratio,
		};
	});
}

async function getAllSubredditsTopComments() {
	const allComments = [];
	for (const subreddit of subReddits) {
		const comments = await getSubredditTopComments(subreddit);
		allComments.push(...comments);
	}
	return allComments;
}

// Usage
getAllSubredditsTopComments()
	.then((comments) => {
		console.log(comments);
	})
	.catch((error) => {
		console.error('Error fetching comments:', error);
	});
