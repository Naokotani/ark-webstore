import * as React from 'react';
import Layout from '../components/layout'


const KitchenSink = () => {
	return (
		<Layout>
			<main>
				<h1>Hello World!</h1>
				<p>
					Bacon ipsum dolor amet alcatra sausage turkey jerky <a >Link here</a> ham hock meatball. Chuck alcatra biltong swine,
					picanha drumstick tenderloin bacon pork belly. Capicola pork chop frankfurter tail, spare ribs landjaeger
					ham venison swine hamburger picanha tongue. Turducken beef pancetta strip steak pork chop bacon beef ribs capicola.
					Shoulder prosciutto pig jowl picanha chicken. Turducken shankle ground round burgdoggen tenderloin.
				</p>

				<hr />

				<h2>Hello World!</h2>
				<blockquote>
					Bacon ipsum dolor amet alcatra sausage turkey jerky <a >Link here</a> ham hock meatball. <strong>Chuck</strong> alcatra biltong swine,
					picanha drumstick tenderloin bacon pork belly. Capicola pork chop frankfurter tail, spare ribs landjaeger
					ham venison swine hamburger picanha tongue. Turducken beef pancetta strip steak pork chop bacon beef ribs capicola.
					Shoulder prosciutto pig jowl picanha chicken. Turducken shankle ground round burgdoggen tenderloin.
				</blockquote>

				<h3>Hello World!</h3>
				<p>
					Bacon ipsum dolor amet alcatra sausage turkey jerky ham hock<a >Link here</a> meatball. Chuck alcatra biltong swine,
					picanha drumstick tenderloin bacon pork belly. Capicola pork chop frankfurter tail, spare ribs landjaeger
					ham venison swine hamburger picanha tongue. Turducken beef pancetta strip steak pork chop bacon beef ribs capicola.
					Shoulder prosciutto pig jowl picanha chicken. Turducken shankle ground round burgdoggen tenderloin.
				</p>
				<div className="split">
					<aside>
						<p>
							Bacon ipsum dolor amet alcatra sausage turkey jerky ham hock<a >Link here</a> meatball. Chuck alcatra biltong swine,
							picanha drumstick tenderloin bacon pork belly. Capicola pork chop frankfurter tail, spare ribs landjaeger
						</p>
					</aside>
					<p>
						Bacon ipsum dolor amet alcatra sausage turkey jerky ham hock<a >Link here</a> meatball. Chuck alcatra biltong swine,
						picanha drumstick tenderloin bacon pork belly. Capicola pork chop frankfurter tail, spare ribs landjaeger
						ham venison swine hamburger picanha tongue. Turducken beef pancetta strip steak pork chop bacon beef ribs capicola.
					</p>
				</div>
				<div className="grid grid--split">
					<aside>
						<p>
							Bacon ipsum dolor amet alcatra sausage turkey jerky ham hock<a >Link here</a> meatball. Chuck alcatra biltong swine,
							picanha drumstick tenderloin bacon pork belly. Capicola pork chop frankfurter tail, spare ribs landjaeger
						</p>
					</aside>
					<p>
						Bacon ipsum dolor amet alcatra sausage turkey jerky ham hock<a >Link here</a> meatball. Chuck alcatra biltong swine,
						picanha drumstick tenderloin bacon pork belly. Capicola pork chop frankfurter tail, spare ribs landjaeger
						ham venison swine hamburger picanha tongue. Turducken beef pancetta strip steak pork chop bacon beef ribs capicola.
					</p>
				</div>

				<hr />
				<div className="card">
					<h3>This is a card</h3>
					<p>
						Bacon ipsum dolor amet alcatra sausage turkey jerky ham hock<a >Link here</a> meatball. Chuck alcatra biltong swine,
						picanha drumstick tenderloin bacon pork belly.
					</p>
					<button>Submit</button>
				</div>
				<h4>Hello World!</h4>
				<p>
					Bacon ipsum dolor amet alcatra sausage turkey jerky ham hock meatball. Chuck alcatra biltong swine,
					picanha drumstick tenderloin bacon pork belly. Capicola pork chop frankfurter tail, spare ribs landjaeger
					ham venison swine hamburger picanha tongue. Turducken beef pancetta strip steak pork chop bacon beef ribs capicola.
					Shoulder prosciutto pig jowl picanha chicken. Turducken shankle ground round burgdoggen tenderloin.
				</p>

				<ul>
					<li>nice list</li>
					<li>This is</li>
					<li>A Really</li>
				</ul>
			</main >
		</Layout>
	)
}


export default KitchenSink;
