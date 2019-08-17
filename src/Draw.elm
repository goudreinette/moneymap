module Draw exposing (..)
import Model exposing (..)

import Color exposing (..)
import Point2d exposing (Point2d)
import Collage.Layout as CollageLayout
import Collage.Text as CollageText
import Collage.Events as CollageEvents
import Collage exposing (..)
import Graph


draw : Model -> Collage Msg
draw model =
    let nodes = List.map (drawNode model) (Graph.nodes model.graph)
        edges = List.map (drawEdge model) (Graph.edges model.graph)
    in 
      CollageLayout.stack (nodes ++ edges)


drawEdge : Model -> Graph.Edge Edge -> Collage Msg
drawEdge model {from, to, label} = 
    let {money} = label
        fromNode = Graph.get from model.graph
        toNode = Graph.get to model.graph
    in
      case (fromNode, toNode) of
          (Just f, Just t) ->
              segment (Point2d.coordinates f.node.label.position) (Point2d.coordinates t.node.label.position)
                |>   traced (solid (toFloat money / 2000) (uniform yellow))
 
      
          _ -> group []
              
     -- sometihing with line

drawNode : Model -> Graph.Node Node -> Collage Msg
drawNode { hoveringId } { label, id } =
    let
        { position, entity, name } =
            label
    in
    CollageLayout.stack <|
        [ (case entity of
            Politician data ->
                drawPolitician data

            _ ->
                rectangle 10.0 10.0
                    |> filled (uniform grey)
          )
            |> shift (Point2d.coordinates label.position)
            |> CollageEvents.onMouseEnter (\_ -> Hover { enter = True, id = id })
            |> CollageEvents.onMouseLeave (\_ -> Hover { enter = False, id = id })
        ]
            ++ (case hoveringId of
                    Just nodeId ->
                        if nodeId == id then
                            [ CollageText.fromString name
                                |> CollageText.size CollageText.huge
                                |> rendered
                                |> shift (Point2d.coordinates label.position)
                                |> shift (10.0, -25.0)
                            ]

                        else
                            []

                    Nothing ->
                        []
               )


drawPolitician : PoliticianData -> Collage Msg
drawPolitician { party } =
    let
        color =
            case party of
                Democrat ->
                    blue

                Republican ->
                    red
    in
    circle 10.0
        |> filled (uniform color)

