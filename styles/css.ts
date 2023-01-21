import styled from 'styled-components'

const Origin = styled.div`
  box-sizing: border-box;
  display: block;
  border-collapse: separate;
  user-select: none;
  border-spacing: 0;
  text-indent: initial;
  font-weight: 400;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  background-color: #333;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  min-height: 100vh;
  padding: 0 0.5rem;
`

export const Game = styled.div`
  display: block;
  border-spacing: 0;
  width: 282px;
  filter: brightness(100%);
  float: left !important;
  border-collapse: separate;
  text-indent: initial;
  user-select: none;
  font-weight: 400;
  font-family: 'OpenSans', sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  -webkit-text-size-adjust: 100%;
  box-sizing: border-box;
`

export const UpperFrame = styled(Origin)`
  width: 252px;
  height: 16.5px;
`
export const SubBox = styled(Origin)`
  width: 252px;
  height: 48px;
`

export const ShortVertical = styled(Origin)`
  width: 18px;
  height: 48px;
  background-image: url(https://minesweeper.online/img/skins/hd/border_vert_2x.png?v=3);
  background-size: 100% 100%;
  float: left;
  color: #333;
`

export const SubMain = styled(Origin)`
  width: 216px;
  height: 48px;
  float: left;
  background: silver;
`
export const SubTopIndent = styled(Origin)`
  width: 216px;
  height: 4.5px;
  background-color: silver;
`
export const SubCenter = styled(Origin)`
  background-color: silver;
`

export const SubLeftIndent = styled(Origin)`
  width: 4.5px;
  height: 31.5px;
  float: left !important;
  background-color: silver;
`
export const SubRightIndent = styled(SubLeftIndent)`
  float: right !important;
`

export const CounterLeft = styled(Origin)`
  width: 61.5px;
  height: 37.5px;
  float: left !important;
  background-image: url(https://minesweeper.online/img/skins/hd/nums_background.svg?v=3);
`

export const CounterTopIndent = styled(Origin)`
  width: 61.5px;
  height: 3px;
`

export const CounterMain = styled(Origin)`
  width: 61.5px;
  height: 31.5px;
`
export const CounterLeftIndent = styled(Origin)`
  width: 3px;
  height: 31.5px;
  float: left !important;
`

export const CountZero = styled(Origin)`
  width: 16.5px;
  height: 31.5px;
  float: left !important;
  background-size: 100% 100%;
  background-image: url(https://minesweeper.online/img/skins/hd/d0.svg?v=3);
`
export const CountOne = styled(CountZero)`
  background-image: url(https://minesweeper.online/img/skins/hd/d1.svg?v=3);
`
export const CountTwo = styled(CountZero)`
  background-image: url(https://minesweeper.online/img/skins/hd/d2.svg?v=3);
`
export const CountThree = styled(CountZero)`
  background-image: url(https://minesweeper.online/img/skins/hd/d3.svg?v=3);
`
export const CountFour = styled(CountZero)`
  background-image: url(https://minesweeper.online/img/skins/hd/d4.svg?v=3);
`
export const CountFive = styled(CountZero)`
  background-image: url(https://minesweeper.online/img/skins/hd/d5.svg?v=3);
`
export const CountSix = styled(CountZero)`
  background-image: url(https://minesweeper.online/img/skins/hd/d6.svg?v=3);
`
export const CountSeven = styled(CountZero)`
  background-image: url(https://minesweeper.online/img/skins/hd/d7.svg?v=3);
`
export const CountEight = styled(CountZero)`
  background-image: url(https://minesweeper.online/img/skins/hd/d8.svg?v=3);
`
export const CountNigne = styled(CountZero)`
  background-image: url(https://minesweeper.online/img/skins/hd/d9.svg?v=3);
`
export const CounterRight = styled(CounterLeft)`
  float: right !important;
`

export const InCounterIndent = styled(Origin)`
  width: 3px;
  height: 31.5px;
  float: left !important;
`

export const FaiceBox = styled(Origin)`
  margin-left: auto;
  margin-right: auto;
  text-align: center;
`

export const Faice = styled(Origin)`
  width: 39px;
  height: 39px;
  background-image: url(https://minesweeper.online/img/skins/hd/face_unpressed.svg?v=3);
  margin: 0 auto;
  text-align: center;
  background-size: 100%;
`

export const StraitLine = styled(Origin)`
  width: 216px;
  height: 16.5px;
  background-image: url(https://minesweeper.online/img/skins/hd/border_hor_2x.png?v=3);
  background-size: 100% 100%;
  float: left;
`

export const RightTop = styled(StraitLine)`
  width: 18px;
  height: 16.5px;
  background-image: url(https://minesweeper.online/img/skins/hd/corner_up_right_2x.png?v=3);
`

export const LeftTop = styled(RightTop)`
  background-image: url(https://minesweeper.online/img/skins/hd/corner_up_left_2x.png?v=3);
`

export const Vertical = styled(StraitLine)`
  width: 18px;
  height: 216px;
  background-image: url(https://minesweeper.online/img/skins/hd/border_vert_2x.png?v=3);
`

export const CenterBox = styled(Origin)`
  width: 252px;
  height: 216px;
`

export const MainBox = styled(Origin)`
  float: left !important;
`

export const Cell = styled(Origin)`
  width: 24px;
  height: 24px;
  font-size: 10px;
  line-height: 23px;
  background-image: url(https://minesweeper.online/img/skins/hd/closed.svg?v=3);
  float: left;
  background-size: 100%;
  font-weight: 700;
  text-align: center;
`
export const CellOpen = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/type0.svg?v=3);
`

export const RedBomber = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/mine_red.svg?v=3);
`

export const Bomber = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/mine.svg?v=3);
`

export const Flag = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/flag.svg?v=3);
`

export const OpenOne = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/type1.svg?v=3);
`

export const OpenTwo = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/type2.svg?v=3);
`

export const OpenThree = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/type3.svg?v=3);
`

export const OpenFour = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/type4.svg?v=3);
`

export const OpenFive = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/type5.svg?v=3);
`

export const OpenSix = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/type6.svg?v=3);
`

export const OpenSeven = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/type7.svg?v=3);
`
export const OpenEight = styled(Cell)`
  background-image: url(https://minesweeper.online/img/skins/hd/type8.svg?v=3);
`

export const Bottom = styled(Origin)`
  width: 18px;
  height: 16.5px;
  background-image: url(https://minesweeper.online/img/skins/hd/corner_bottom_left_wide_2x.png?v=3);
  float: left;
`
export const BottomsBottom = styled(Origin)`
  width: 18px;
  height: 16.5px;
  background-image: url(https://minesweeper.online/img/skins/hd/t_left_2x.png?v=3);
  float: left;
  background-size: 100% 100%;
`
