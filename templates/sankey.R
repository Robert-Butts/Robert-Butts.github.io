# Sankey Diagram
# Question: How did this year's 2,350 applicants move from applying to enrolling?
# Put this script and sankey.csv in the same folder, then in RStudio choose
# Session > Set Working Directory > To Source File Location.
# Also needs: ggalluvial. Run install.packages("ggalluvial") once.

library(tidyverse)
library(ggalluvial)

# ---- Gallery look: dark background, soft gray text ----
font <- "IBM Plex Sans"   # use "sans" if IBM Plex Sans is not installed
ink  <- "#8B97A7"

theme_gallery <- function() {
  theme_minimal(base_size = 16, base_family = font) +
    theme(
      plot.background  = element_rect(fill = "#161B23", color = NA),
      panel.grid       = element_line(color = "#222A34"),
      panel.grid.minor = element_blank(),
      text             = element_text(color = ink),
      axis.text        = element_text(color = ink),
      legend.position  = "top",
      legend.title     = element_blank(),
      plot.margin      = margin(24, 28, 18, 18)
    )
}

pal <- c("Admitted" = "#7FD18C", "Waitlisted" = "#F0B95A", "Denied" = "#5B6676")

df <- read_csv("sankey.csv", show_col_types = FALSE) |>
  mutate(across(c(applied_as, decision, result), fct_inorder))

# Each axis is one stage; the bands between them are colored by the decision
p <- ggplot(df, aes(axis1 = applied_as, axis2 = decision, axis3 = result, y = students)) +
  geom_alluvium(aes(fill = decision), width = 0.3, alpha = 0.8, curve_type = "sigmoid") +
  geom_stratum(width = 0.3, fill = "#2E3845", color = "#161B23", linewidth = 0.8) +
  # Each stage's boxes are labeled with their name and total
  geom_text(stat = "stratum",
            aes(label = paste0(str_wrap(after_stat(stratum), 10), "\n", scales::comma(after_stat(count)))),
            color = "#E8EDF4", family = font, size = 4, lineheight = 0.9) +
  scale_x_discrete(limits = c("Applied as", "Decision", "Result"),
                   expand = expansion(add = 0.2)) +
  scale_fill_manual(values = pal) +
  labs(x = NULL, y = NULL, caption = "Band widths show students. Sample values, not real data.") +
  theme_gallery() +
  theme(panel.grid = element_blank(), axis.text.y = element_blank(),
        axis.text.x = element_text(size = 14, color = ink),
        plot.caption = element_text(color = ink, hjust = 0))

ggsave("sankey.png", p, width = 9, height = 6, dpi = 200)
p
