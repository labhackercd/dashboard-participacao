import React from "react";
import ResponsiveDrawer from "../MenuDrawer";
import WikilegisGenderChart from "../../components/Wikilegis/WikilegisGenderChart";
import WikilegisProjectsPerYear from "../../components/Wikilegis/WikilegisProjectsPerYear";
import WikilegisProjectsPerTheme from "../../components/Wikilegis/WikilegisProjectsPerTheme";
import WikilegisSuggestionsPerProject from "../../components/Wikilegis/WikilegisSuggestionsPerProject";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

function WikilegisChartsPage() {
  return (
    <div>
      <ResponsiveDrawer title="Wikilegis - Gráficos">
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Paper>
                <WikilegisProjectsPerTheme></WikilegisProjectsPerTheme>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper>
                <WikilegisGenderChart></WikilegisGenderChart>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper>
                <WikilegisProjectsPerYear></WikilegisProjectsPerYear>
              </Paper>
            </Grid>
            <Grid item xs={12} md={12}>
              <Paper>
                <WikilegisSuggestionsPerProject></WikilegisSuggestionsPerProject>
                <div style={{ padding: "1.5rem" }}>
                  <p>
                    {" "}
                    1 - Proíbe distribuição e sorteio de animais em eventos{" "}
                  </p>
                  <p>
                    {" "}
                    2 - Proteção e apoio psicológico à mulher atleta vítima de
                    violência física ou sexual{" "}
                  </p>
                  <p>
                    {" "}
                    3 - Política de Comunicação para a Câmara dos Deputados
                  </p>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </ResponsiveDrawer>
    </div>
  );
}

export default WikilegisChartsPage;
