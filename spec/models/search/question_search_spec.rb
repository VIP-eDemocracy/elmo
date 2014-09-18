require "spec_helper"

describe Question do
  describe "search" do
    def search(query)
      Question.do_search(Question, query)
    end

    before do
      @questions = [
        create(:question, name_en: 'How many cheeses?', name_fr: 'Combien de fromages?', code: 'Cheese'),
        create(:question, name_en: 'Your job?', name_fr: 'Votre metier?', qtype_name: 'text', tags: [create(:tag, name: 'employment')]),
      ]
    end

    it "partial title search" do
      expect(search 'cheese').to eq [@questions[0]]
      expect(search 'title: many').to eq [@questions[0]]
      expect(search 'fromage').to eq []
    end

    it "different locale" do
      I18n.locale = :fr
      expect(search 'job').to eq []
      expect(search 'metier').to eq [@questions[1]]
      I18n.locale = :en
      expect(search 'job').to eq [@questions[1]]
    end

    it "partial code search" do
      expect(search 'code: eese').to eq [@questions[0]]
    end

    it "question type search" do
      expect(search 'type: text').to eq [@questions[1]]
    end

    it "tag search" do
      expect(search 'tag: employment').to eq [@questions[1]]
      # partial tag search should not work
      expect(search 'tag: loy').to eq []
    end

    it "empty search" do
      expect(search '').to eq @questions
    end
  end
end
