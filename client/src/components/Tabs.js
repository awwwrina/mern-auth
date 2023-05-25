export const Tabs = ({ tabs, tab, setTab }) => {
	return (
		<div className="homepage__tab-wrapper">
			{tabs.map((item) => (
				<button
					onClick={() => setTab(item.type)}
                    key={item.type}
					className={`homepage__tab ${
						tab === item.type ? "homepage__tab_active" : ""
					}`}
				>
					{item.name}
				</button>
			))}
		</div>
	);
};
