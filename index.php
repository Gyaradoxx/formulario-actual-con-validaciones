<?php

include_once  'php/connection.php';

$select = "SELECT * FROM id";

$sql_select = $connection->prepare($select);

$sql_select->execute();


$resultado = $sql_select->fetchAll();



// print_r($resultado);
// echo "<br>";




?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validación de formulario</title>
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <header>
        <h1>Formulario de inscripción</h1>
    </header>
    <main>
        <div class="breakpoint-max">
            <form action="php/insert.php" method="post" autocomplete="on">
                <fieldset class="grid-3">
                    <legend>Introduce tus datos</legend>
                    <div>
                        <label for="nombre">Nombre:</label>
                        <input type="text" name="nombre" id="nombre" onchange="corregirInicialNombre('nombre')" required>
                        <div id="mensaje-nombre" class="mensaje">

                        </div>
                    </div>
                    <div>
                        <label for="apellido">Apellido:</label>
                        <input class="input-box" type="text" name="apellido" id="apellido" required onchange="corregirInicialNombre('apellido')">
                        <div id="mensaje-apellido" class="mensaje"></div>
                    </div>
                    <div>
                        <label for="fecha-nac">Fecha de nacimiento<sup>*</sup> :</label>
                        <!-- this accede al contenido del elemento  -->
                        <!-- en este caso es el input y hay que añadir el value  -->
                        <input class="input-box" type="date" name="fecha-nac" id="fecha-nac" required onchange="mayorEdad(this.value)">
                        <div id="mensaje-fecha-nac" class="mensaje">
                        </div>
                    </div>
                    <div>
                        <label for="dni">DNI / NIE :</label>
                        <input type="text" name="dni" id="dni" onchange="validaDniNie(form.dni.value)" required>
                        <div id="mensaje-dni" class="mensaje"></div>
                    </div>
                    <div>
                        <label for="tel">Teléfono:</label>
                        <input type="tel" name="tel" id="tel" onchange="validaTel(form.tel.value)" required>
                        <div id="mensaje-tel" class="mensaje"></div>
                    </div>
                    <div>
                        <label for="email">Email:</label>
                        <input type="email" name="email" id="email" onchange="validaEmail(form.email.value)" required>
                        <div id="mensaje-email" class="mensaje"></div>
                    </div>
                    <div>
                        <label for="codigo-postal">Código Postal:</label>
                        <input type="text" id="postal" name="codigo-postal" onchange="validaCodigoPostal(form.postal.value)" required>
                        <div id="mensaje-postal" class="mensaje"></div>

                    </div>
                    <div>
                        <label for="direccion">Dirección:</label>
                        <input type="text" id="direccion" name="direccion" onchange="validaDireccion(form.direccion.value)" required>
                        <div id="mensaje-direccion" class="mensaje"></div>

                    </div>
                    <div>
                        <label for="poblacion">Población:</label>
                        <input type="text" id="poblacion" name="poblacion" onchange="validaPoblacion(form.poblacion.value)" required>
                        <div id="mensaje-poblacion" class="mensaje"></div>

                    </div>
                    <div>

                    </div>
                    <div id="div-enviar">
                        <button id="enviar" type="submit" onclick="enviarDatos()" disabled>
                            Enviar Datos
                        </button>
                    </div>
                    <div>
                        <button type="reset" id="resetear" onclick="borrarMensajes()">Borrar Datos</button>
                    </div>


                </fieldset>

            </form>

            <div id="tabla">

                <?php
                    if (count($resultado) > 0) {
                        $tabla = "<table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Fecha de Nac.</th>
                                <th>DNI</th>
                                <th>Teléfono</th>
                                <th>Email</th>
                                <th>Codigo Postal</th>
                                <th>Direccion</th>
                                <th>Poblacion</th>
                                <th>Borrar</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>";

                        foreach ($resultado as $fila) {
                            $tabla .=  "<tr>";
                            $tabla .=  "<td>" . $fila['nombre'] . "</td>";
                            $tabla .=  "<td>" . $fila['apellido'] . "</td>";
                            $tabla .= "<td>" . $fila['fecha-nac'] . "</td>";
                            $tabla .= "<td>" . $fila['dni'] . "</td>";
                            $tabla .=  "<td>" . $fila['tel'] . "</td>";;
                            $tabla .=  "<td>" . $fila['email'] . "</td>";
                            $tabla .=  "<td>" . $fila['codigo-postal'] . "</td>";
                            $tabla .=  "<td>" . $fila['direccion'] . "</td>";
                            $tabla .=  "<td>" . $fila['poblacion'] . "</td>";
                            $tabla .= "<td><a href ='php/borrar.php?id=".$fila['id']."'> Borrar </a></td>" ;
                            $tabla .= "<td><a href ='php/editar.php'> Editar </a></td>" ;
                            $tabla .= "</tr>;

                            
                            ";
                        }
                        
                        $tabla .= "</tbody> </table>";
                        echo $tabla;
                    }
                    ?>


            </div>
        </div>
    </main>

    <script src="js/script.js"></script>
</body>

</html>