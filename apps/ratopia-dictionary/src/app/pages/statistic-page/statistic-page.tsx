import Connection from '../../components/connection/connection';
import './statistic-page.scss';
import Panel from "../../components/panel/panel";
import { apiService } from "../../services/api-service";
import RefreshCitizen from "../../components/refresh-citizen/refresh-citizen";

interface WinItem {
  name: string;
  action: string;
  icon: string;
}

const WIN_ITEMS: WinItem[] = [
  {
    name: 'policy',
    action: 'policy',
    icon: 'Icon_Policy.png'
  },
  {
    name: 'diplomacy',
    action: 'diplomacy',
    icon: 'Icon_Diplomacy.png'
  },
  {
    name: 'trading',
    action: 'trading',
    icon: 'Icon_Trade.png'
  },
  {
    name: 'blacksmith',
    action: 'blacksmith',
    icon: 'Icon_Anvil.png'
  },
  {
    name: 'expedition',
    action: 'expedition',
    icon: 'Icon_Expedition.png'
  },
  {
    name: 'kitchen',
    action: 'kitchen',
    icon: 'Icon_Cooking.png'
  },
  {
    name: 'eat',
    action: 'eat',
    icon: 'Icon_CookingEffect.png'
  }
];

export function StatisticPage() {
  const openPage = (action: string) => {
    apiService.openPage(action).then((result) => {
      console.log(result);
    });
  }

  return (
    <div className="statistic">
      <div className="statistic__line">
        <Connection />

        <RefreshCitizen />
      </div>

      <Panel className="statistic__content">
        <h2 className="statistic__title">Открыть окно</h2>

        <div className="statistic__items">
          { WIN_ITEMS.map(item =>
            <button key={item.action} className="statistic__item" onClick={() => openPage(item.action)}>
              <img src={ "/assets/struct/" + item.icon } alt="" />
            </button>
          ) }
        </div>
      </Panel>
    </div>
  );
}

export default StatisticPage;
