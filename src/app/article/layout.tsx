import React, { ReactNode } from 'react';

type ArticleLayoutProps = {
	children: ReactNode;
};

/* This is the layout for all the home-based elements
("About Us" page, "Contact Us" page, etc) */
export default function ArticleLayout({ children }: ArticleLayoutProps) {
	return (
		<>
			<div className="">{ children }</div>
		</>
	);
}